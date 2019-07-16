import React,{Component} from "react"
import "./TodoList.css"
import PropTypes from "prop-types"
class TodoItem extends Component{
    constructor(props){
    super(props);
    this.deleteInputValue=this.deleteInputValue.bind(this)
    }
    render(){
        console.log("子组件render被执行")
    return (
     <div key={this.props.index}>{this.props.item}<button key={this.props.index}  className="delete"  onClick={this.deleteInputValue}>删除</button></div>
    )
    }

    deleteInputValue(){
        this.props.deleteInput(this.props.index)
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.item!==this.props.item)
        {
            return true
        }
        else{
            return false
        }
    }

}
TodoItem.propTypes={
    item:PropTypes.string,
    deleteInput:PropTypes.func,
    index:PropTypes.number
}
TodoItem.defaultProps={
    item:"默认记事"
}
export default TodoItem;