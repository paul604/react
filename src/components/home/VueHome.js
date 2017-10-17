var React = require("react");
var ReactDOM = require("react-dom");

const VueHome = function (props){
    return (
        <div>
            {props.errorImg != "" ?
                    <div>
                        <img src={props.errorImg} height="250" width="300"/>
                        <p>{props.errorMsg}</p>
                    </div>
                    :
                    <div></div>
            }

            <h1>
                home
            </h1>
            <div id="msg">

                {props.loadImg != "" ?
                    <div>
                        <img src={props.loadImg}/>
                    </div>
                    :
                    <ul id="msg_ul">
                        {props.msg.map(function(item, index){
                            return (
                                <li key={index}>
                                    <img src={item.user.image} height="50" width="50"/> {item.user.name}: ({item.date})
                                    {item.user.id === props.dataUser.userId?
                                         <button type="button" value={item.id} onClick={props.supMsg}>supprimer</button> :
                                         <span/>
                                    }
                                    <ul>
                                        <li>
                                            {item.message}
                                        </li>
                                    </ul>
                                    <hr/>
                                </li>
                            );
                        }.bind(this))}
                    </ul>
                }
            </div>
            <form onSubmit={props.sendMsg}>
                <label>Msg :</label>
                <textarea name="msg" value={props.newMsg} rows="1" cols="100" onInput={props.updateUserCrea} >
                </textarea>
                {props.newMsg === ""?
                    <input type="submit" value="send" disabled/>
                    :
                    <input type="submit" value="send"/>
                }
                <input type="button" onClick={props.getMsg} value="F5" />
                <input type="button" onClick={props.deconection} value="déconection" />

            </form>
        </div>
    );
}

module.exports = VueHome;
