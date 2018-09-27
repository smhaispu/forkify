import uniqid from 'uniqid'
export default class List{
constructor(){
    this.item= [];
}
addItem(count,unit,ingredient){
       const newitem= {
            id : uniqid(),
            count,
            unit,
            ingredient
        }
        this.item.push(newitem);
        return newitem;
    }
deleteItem(id){
    const itemIndex = this.item.findIndex(el => el.id ===id)
    this.item.splice(itemIndex,1);
    }
updateItem(id,newCount){
  this.item.find(el=>el.id===id).count = newCount;
}
}