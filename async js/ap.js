const apiEndPoint=  "https://jsonplaceholder.typicode.com/posts";

//select dom elements

        const getButton=document.querySelector("#getPost");
        const createButton=document.querySelector("#createPost");
        const updateButton=document.querySelector("#updatePost");
        const patchButton=document.querySelector("#patchPost");
        const deleteButton=document.querySelector("#deletePost");

        function getPost(){
            fetch(apiEndPoint).then(response =>{
                response.json().then(posts => console.log(posts));
            });

        }
        getButton.addEventListener("click",()=>{
            getPost();
        })
        
        