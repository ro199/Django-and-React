import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addProfile } from '../../actions/profiles'
import { Redirect } from 'react-router-dom';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const imageMaxSize = 1000000000 // bytes
let isRegister = false;

export class Profile extends Component{

    fileInputRef = React.createRef();

    state = {
        first_name: "",
        last_name: "",
        photo: null,
        is_admin: false,
        is_staff: true
    };

    static propTypes = {
        addProfile: PropTypes.func.isRequired,
        isRegister: PropTypes.bool
    };

    verifyFile = (files, fi) => {
        if (files && fi.length > 0){
            const currentFile = files
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            return true
        }
    };

    handleFileSelect = event => {
        const files = event.target.files[0];
        if (files && event.target.files.length > 0){
            console.log(files)
            const isVerified = this.verifyFile(files, event.target.files)
            if (isVerified) {
                console.log('pase el verified')
                const currentFile = files
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", ()=>{
                    const myResult = myFileItemReader.result
                    console.log('Imprimo el myResult', myResult)
                    this.setState({
                        photo: currentFile
                    })
                }, false)
                myFileItemReader.readAsDataURL(currentFile)
                console.log(myFileItemReader);
            }
        }
    }

    onChecked = event => {
        console.log(event.target.checked)
        this.setState({
            [event.target.id]: event.target.checked
        });
        console.log('valor del admin', this.state.is_admin.toString())
        console.log('valor del staf', this.state.is_staff.toString())
    }

    onChange = e => this.setState({ [e.target.id]: e.target.value });

    onSubmit = e => {
        console.log("registro ", this.props.isRegister )
        e.preventDefault();
        console.log('Estado de la foto ', photo);
        let form_data = new FormData();
        form_data.append('photo', this.state.photo, this.state.photo.name);
        form_data.append('first_name', this.state.first_name);
        form_data.append('last_name', this.state.last_name);
        form_data.append('is_admin', this.state.is_admin);
        form_data.append('is_staff', this.state.is_staff);
        this.props.addProfile(form_data);
        console.log("registro ", this.props.isRegister )
        this.setState({
            first_name: "",
            last_name: "",
            photo: null,
            is_admin: false,
            is_staff: true
        });
    };

    render(){
        if (this.props.isRegister) {
            return <Redirect to="/" />
        }
        return (
            <Fragment>
                <div className="col-md-6 m-auto">
                    <div className="card card-body mt-4 mb-4">
                        <h2>Perfil</h2>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Nombre: </label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    id="first_name"
                                    onChange={this.onChange}
                                    value={this.state.first_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido: </label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    id="last_name"
                                    onChange={this.onChange}
                                    value={this.state.last_name}
                                />
                            </div>
                            <div className="form-group">
                                <label>Foto: </label>
                                <input 
                                    ref={this.fileInputRef}
                                    className="form-control"
                                    type="file"
                                    id="photo"
                                    accept={acceptedFileTypes}
                                    multiple={false}
                                    onChange={this.handleFileSelect}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Tipo de usuario: </label>
                            </div>
                            <div className="form-group">
                                <div className="container mr-sm-2 ml-2 ">
                                    <input
                                        type="checkbox"
                                        id="is_admin"
                                        onChange={this.onChecked}
                                        checked={this.state.is_admin}
                                    />
                                    <label className="mr-sm-2 ml-2">Administrador </label>

                                    <input
                                        type="checkbox"
                                        id="is_staff"
                                        onChange={this.onChecked}
                                        checked={this.state.is_staff}
                                    />
                                    <label className="mr-sm-2 ml-2">Staf </label>
                                </div>
                                
                            </div>

                            <div className="form-group">
                                <button className="btn btn-success" type="submit">
                                    Registro
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = state => ({
    isRegister: state.profiles.isRegister
});

export default connect(mapStateToProps, {addProfile})(Profile);