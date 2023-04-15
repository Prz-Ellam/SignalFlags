import Post from '../models/post.model.js';
import Group from '../models/group.model.js';

export const postCreateController = async (req, res) => {
    const user = req.user;
    const { groupId } = req.params;
    const { content } = req.body;

    try {
        const requestedGroup = await Group.findById(groupId);
        if (!requestedGroup) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no existe'
            });
        }

        const post = new Post({
            content,
            group: groupId,
            user: user._id
        });

        await post.save();

        res.json(post);
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
                message: 'El grupo no existe'
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

        res.json({
            status: true,
            message: 'Si'
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