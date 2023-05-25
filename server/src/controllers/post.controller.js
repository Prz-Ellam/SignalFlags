import Post from '../models/post.model.js';
import Group from '../models/group.model.js';
import UserSocketModel from '../models/userSocket.model.js';

export const postCreateController = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { content } = req.body;
    const files = req.files ?? [];

    try {
        const requestedGroup = await Group.findById(id);
        if (!requestedGroup) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no existe'
            });
        }

        const isAuthUserMember = requestedGroup.members.includes(user._id); 
        if (!isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        }

        const filesuris = files.map(file => ({ 
            url: `/uploads/${ file.filename }`,
            type: file.mimetype
        }));

        const sockets = await UserSocketModel.find({ user: user._id });

        const post = new Post({
            content,
            group: id,
            user: user._id,
            attachments: filesuris,
            activeUser: !!sockets
        });
        await post.save();

        res.status(201).json({
            status: true,
            message: 'Publicación creada',
            postId: post._id
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

export const postReplyController = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const { content } = req.body;
    try {
        const requestedPost = await Post.findById(id);
        if (!requestedPost) {
            return res.status(404).json({
                status: false,
                message: 'La publicación no existe'
            });
        }

        const requestedGroup = await Group.findById(requestedPost.group);
        const isAuthUserMember = requestedGroup.members.includes(user._id); 
        if (!isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        }

        await Post.findByIdAndUpdate(id, {
            $push: { 
                replies: {
                    content,
                    user: user._id
                }
            }
        }, { new: true });

        res.status(201).json({
            status: true,
            message: 'Respuesta enviada'
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

export default {
    create: postCreateController,
    reply: postReplyController
}