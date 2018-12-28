import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tasks: [],
            key: 0, 
            isFocus: false
        };
        //methods bind
        this.changeValue = this.changeValue.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeEl = this.removeEl.bind(this);
        this.checkFocus = this.checkFocus.bind(this);
        this.checkBlur = this.checkBlur.bind(this);
        this.checkSubmit = this.checkSubmit.bind(this);
    }
    checkSubmit(e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13 && this.state.isFocus && this.state.value) {
            this.addTask(e);
        }
    }
    checkFocus(e) {
        this.setState({
            isFocus: true
        });
    }
    checkBlur(e) {
        this.setState({
            isFocus: false
        });
    }
    changeValue(e) {
        this.setState({
            value: e.target.value
        });
    }
    removeEl(e, elementID) {
        const tasks = this.state.tasks;
        // console.log(tasks);
        for (let i = 0; i < tasks.length; i++) {
            if (parseInt(tasks[i].props.taskID) === parseInt(elementID)) {
                tasks.splice(i, 1);
            }
        }
        this.setState({
            tasks: tasks
        });
    }
    addTask(e) {
        let value = this.state.value;
        let key = this.state.key;
        const tasks = this.state.tasks;
        if (value !== '') {
            tasks.push(
                <Task key={key} taskID={key} value={value} onClick={this.removeEl} />
            );
            key++;
        } else {
            return null;
        }
        this.setState({
            value: '',
            key: key,
            tasks: tasks
        });
    }
    render() {
        return(
            <div className="todo__container">
                <div className="todo__inner-container">
                    <div className="todo__add-row add">
                        <input type="text" className="add__text" placeholder="Wpisz zadanie..."
                        value={this.state.value}
                        onChange={this.changeValue}
                        onFocus={this.checkFocus}
                        onBlur={this.checkBlur}
                        onKeyUp={this.checkSubmit}
                        />
                        <button className="add__submit" onClick={this.addTask} >Dodaj</button>
                    </div>
                </div>
                <Tasks tasks={this.state.tasks} />
            </div>
        );
    }
}

class Tasks extends React.Component {
    render() {
        return(
            <ul className="tasks__list">
                {this.props.tasks}
            </ul>
        );
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDone: false
        }
        this.checkTaskDone = this.checkTaskDone.bind(this);
    }
    checkTaskDone(e) {
        let isDone = !this.state.isDone;
        let target = e.target;
        if (isDone) {
            target.classList.add("active");
            // console.dir(target.children);
            target.nextElementSibling.style.textDecoration = "line-through";
        } else {
            target.classList.remove("active");
            target.nextElementSibling.style.textDecoration = "initial";
        }
        this.setState({
            isDone: isDone
        });
    }
    render() {
        return(
            <li className="task">
                <label htmlFor="done-task" onClick={this.checkTaskDone} tabindex="0">
                    <input name="done-task" type="checkbox" className="task__done" checked={this.state.isDone}/>
                </label>
                <span>{this.props.value}</span>
                <span className="task__remove" tabindex="0" onClick={(event) => {
                    this.props.onClick(event, this.props.taskID);
                }}></span>
            </li>
        );
    }
}

class App extends React.Component {
    render() {
        return(
            <div className="app__container">
                <div className="app__inner-container">
                    <h1 className="app__title">ToDoApp</h1>
                    <div className="app__main-content todo">
                        <AddTask />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
