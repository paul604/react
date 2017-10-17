var React = require("react");
var ReactDOM = require("react-dom");

/**
 * VueConnection - la vue de Connection
 *
 * @param  {Object} props
 * @return {Object}
 */
const VueConnection = function (props){
    return (
        <div >
            {props.errorImg != "" ?
                    <div>
                        <img src={props.errorImg} height="250" width="300"/>
                        <p>{props.errorMsg}</p>
                    </div>
                    :
                    <div></div>
            }
            {props.loadImg != "" ?
                <div>
                    <img src={props.loadImg}/>
                </div>
                :
                <div></div>
            }

            <div id="form" >
                <form action="" method="post" onSubmit={ props.creat } >
                    <h1>Création</h1>
                    <hr/>
                    <label >Nom :</label>
                    <input id="name" type="text" name="name" onInput={ props.updateUserCrea }/>
                    <br/>
                    <label>Password :</label>
                    <input id="password" type="password" name="password" onInput={ props.updateUserCrea }/>
                    <br/>
                    <label>image :</label>
                    <input id="image" type="text" name="image" onInput={ props.updateUserCrea }/>
                    <br/>
                    <input type="submit" value="créer compte" />
                </form>
                <form action="" method="post" onSubmit={ props.connection } >
                    <h1>Connection</h1>
                    <hr/>
                    <label >Nom :</label>
                    <input id="name" type="text" name="name" onInput={ props.updateUserCo }/>
                    <br/>
                    <label>Password :</label>
                    <input id="password" type="password" name="password" onInput={ props.updateUserCo }/>
                    <br/>
                    <input type="submit" value="Connection" />
                </form>
            </div>
        </div>
    );
}

module.exports = VueConnection;
