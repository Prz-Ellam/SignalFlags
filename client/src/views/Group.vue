<template>
<section class="bg-dark container-fluid">
    <div>   
        <div class="row">
            <div class="col-1 bg-secondary text-center">
                <ul class="nav flex-column  ">
                    <li class="nav-item py-5">
                        <a class="nav-link active" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grey" class="nav-icon bi bi-person-square" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                            </svg>
                        </a>
                    </li>
                    <li class="nav-item py-5">
                        <a class="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grey" class="nav-icon bi bi-chat-dots" viewBox="0 0 16 16">
                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                        </svg>
                        </a>
                    </li>
                    <li class="nav-item py-5">
                        <a class="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grey" class="nav-icon bi bi-journal-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            </svg>

                        </a>
                    </li>
                    <li class="nav-item py-5">
                        <a class="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="grey" class="nav-icon bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </a>
                    </li>
                </ul>     
            </div>
            <div class="col-11 bg-dark text-white text-center" >        
                <div class="py-3 px-5 ">
                    <div class="box bg-secondary scrollbar bordered thin py-5 px-5">
                        <div>
                        <h3> Mis grupos </h3>
                        <div class="row " id="group-container">
                            <div class="col-md-3">
                                <a href="">
                                    <div class="mb-5 mt-5 border" style="height: 250px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Nombre grupo </h6>
                                    </div> 
                                </a>
                            </div>
                            <div class="col-md-3">
                                <a href="">
                                    <div class="mb-5 mt-5 border" style="height: 250px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Nombre grupo </h6>
                                    </div> 
                                </a>
                            </div>
                            <div class="col-md-3">
                                <a href="">
                                    <div class="mb-5 mt-5 border" style="height: 250px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Nombre grupo  </h6>
                                    </div> 
                                </a>
                            </div>
                        </div>
                        </div>
                        
                        <div>
                        <h3> Unirse a un grupo </h3>
                        <div class="row " id="group-container">
                            <div class="col-md-3" >
                                <div class="mb-5 mt-5 border " style="height: 300px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white pb-5"> Crea un grupo. </h6>
                                    <button type="button" class="flex-fill bd-highlight btn btn-primary rounded-5 "> Crear </button>
                                </div> 
                            </div>
                            <div class="col-md-3">
                                <div class="mb-5 mt-5 border" style="height: 300px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Unete a un grupo privado. </h6>
                                    <input type="text" name="code" id="code" class=" bg-secondary border-0 shadow-none text-white"  placeholder="código">
                                    <br> <br><button type="button" class="flex-fill bd-highlight btn btn-primary rounded-5 "> Unirse </button>
                                </div> 
                            </div>
                            <div class="col-md-3">
                                <a href="">
                                <div class="mb-5 mt-5 border" style="height: 300px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Nombre grupo público </h6>
                                    </div> 
                                </a>
                            </div>
                            <div class="col-md-3">
                                <a href="">
                                <div class="mb-5 mt-5 border" style="height: 300px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Nombre grupo público </h6>
                                    </div> 
                                </a>
                            </div>
                            <div class="col-md-3">
                                <a href="">
                                <div class="mb-5 mt-5 border" style="height: 300px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Nombre grupo público </h6>
                                    </div> 
                                </a>
                            </div>  
                            <div class="col-md-3">
                                <a href="">
                                <div class="mb-5 mt-5 border" style="height: 300px;">
                                    <img src="../assets/images/POI_SignalFalgs.png" width="150" height="150" class="rounded float-left" alt="..."> 
                                    <h6 class="text-white"> Nombre grupo público </h6>
                                    </div> 
                                </a>
                            </div>
                        </div>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
            
        </div>
    </div>
</section>
</template>

<script>
</script>

<style>
</style>