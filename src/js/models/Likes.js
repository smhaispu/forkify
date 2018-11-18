export default class Likes{
    constructor(){
        this.likes =[];
    }
    addLike(id,title,author,img){
        const like = {id,title,author,img};
        this.likes.push(like);
        //pass the like array to the local storage
        this.storeLikeData()
        return like;
    }
    deleteLike(id){
        let likeIndex= this.likes.findIndex(el => el.id === id);
        this.likes.splice(likeIndex,1);
        //pass the like array to the local storage
        this.storeLikeData()
    }
    getNumLikes(){
        return this.likes.length;
    }
    isLiked(id){
        return this.likes.findIndex(el => el.id ===id) !==-1;
    }
    storeLikeData(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    readLocalData(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage)this.likes = storage;
    }
}