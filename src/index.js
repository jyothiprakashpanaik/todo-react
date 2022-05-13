import ReactDOM from 'react-dom'
import React from 'react';
import './index.css';


class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskDesc: ""
    }
  }

  handleTextFunction(event) {
    this.setState({
      taskDesc: event.target.value,
    })
  }

  handleClickFunction() {
    alert("Task is added " + this.state.taskDesc);
    this.props.handlerToCollectTaskInfo(this.state.taskDesc);
    this.setState({
      taskDesc: ""
    })
  }

  render() {

    return (
      <div>
        <form>
          <input type="text" placeholder="Enter Task." value={this.state.taskDesc} onChange={(event) => this.handleTextFunction(event)} />
          <input type="button" value="Add Todo" onClick={() => this.handleClickFunction()} />
        </form>
      </div>
    );
  }
}

class TaskList extends React.Component {

  handleTaskCompletion(taskDesc) {
    this.props.handleTaskTodoFinish(taskDesc);
  }

  render() {
    let list = [];
    for (let i = 0; i < this.props.tasks.length; i++) {
      let task = this.props.tasks[i];
      let spanAction;
      if (task.isFinished) {
        spanAction = (<span class="material-icons">done</span>);
      }
      else {
        spanAction = (<span class="material-icons">close</span>);
      }
      let comp = (
        <div class="js-block">
          <div key={i} onClick={(event) => this.handleTaskCompletion(task.desc)}>
            <span>{task.desc}</span>
            {spanAction}
          </div>
        </div>
      );
      list.push(comp);
    }

    return (
      <div className={this.props.forStyling} >
        <div class="title">{this.props.purpose}</div>
        <div class="ul-list">{list}</div>
      </div>
    );
  }
}


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          desc: "Switch Off light",
          isFinished: false
        },
        {
          desc: "Switch On fan",
          isFinished: true
        },
        {
          desc: "Watch TV",
          isFinished: true
        },
        {
          desc: "Complete HW",
          isFinished: false
        },
        
      ]
    }
  }
  handleTaskInfo(taskDesc) {
    let oldTasks = this.state.tasks.slice();
    oldTasks.push({
      desc: taskDesc,
      isFinished: false,
    });
    this.setState({
      tasks: oldTasks,
    })
  }

  handleTaskTodoFinish(taskDesc) {
    let oldTasks = this.state.tasks.slice();
    let taskU = oldTasks.find(ot => ot.desc === taskDesc);

    if (taskU.isFinished === true) {
      taskU.isFinished = false;
    }
    else {
      taskU.isFinished = true;
    }

    this.setState({
      tasks: oldTasks,
    })
  }
  render() {
    // const name = "JyothiPrakash";
    // console.log(this.state);
    let tasks = this.state.tasks;
    let todoTasks = tasks.filter(t => t.isFinished === false);
    let doneTasks = tasks.filter(t => t.isFinished === true);
    return (
      <>
        <div className="add-task">
          <AddTask handlerToCollectTaskInfo={(taskDesc) => { this.handleTaskInfo(taskDesc) }} />
        </div>
        <div className="task-list">
          <TaskList purpose="Task Todo" forStyling="todo" tasks={todoTasks} handleTaskTodoFinish={(taskDesc) => this.handleTaskTodoFinish(taskDesc)} />
          <TaskList purpose="Task Done" forStyling="finished" tasks={doneTasks} handleTaskTodoFinish={(taskDesc) => this.handleTaskTodoFinish(taskDesc)} />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));