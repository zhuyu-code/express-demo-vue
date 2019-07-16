import React ,{Component} from "react"
import "./TodoList.css"
import TodoItem from "./TodoItem.js"
import axios from "axios"

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state={
            inputValue:"",
            list:["zhuyu"]
        }
        this.changeInput=this.changeInput.bind(this)
    }
render(){
    console.log("父组件render函数被执行")
    return (
        <div>
           <div className="top">
           <label htmlFor="inputValue">记录</label>
            <input
            id="inputValue" 
            onChange={this.changeInput} 
            value={this.state.inputValue}></input>
            <button onClick={this.addInput.bind(this)}>提交</button>
           </div>
            <div className="top">
                <ul ref={(ul)=>{this.ul=ul}}>
                   {
                      this.getTodoListItem()
                   }
                </ul>
            </div>
        </div>
    )
}

componentDidMount(){
    axios.get("https://www.easy-mock.com/mock/5d0f53982e31f746d8d06037/todolist/api/todolist")
    .then((res)=>{
        var list2=res.data.data;
        this.setState(()=>{
            return {
                list:[...this.state.list,...list2]
            }
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

getTodoListItem(){
    return  this.state.list.map((item,index)=>{ 
        return ( 
        <TodoItem 
        key={index}
         item={item} 
         index={index}
          deleteInput={this.deleteInput.bind(this)}/>)
           
       }
       )
}

changeInput(e){
    const value =e.target.value
    this.setState(()=>{
        return {
            inputValue:value
        }
    })
}

addInput(){
    if(this.state.inputValue){
        var list=[...this.state.list,this.state.inputValue]
        this.setState(()=>{
            return {
                list:list,
                inputValue:''
            }
        },()=>{
            console.log(this.ul.querySelectorAll("div").length)
        })

       
    }else{
        alert("请输入内容在提交 ")
    }
    
}

deleteInput(index){
    var list=this.state.list;
    list.splice(index,1)
    this.setState({
        list:list
    })

}
}
export default TodoList;