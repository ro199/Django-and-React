import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addResource, deleteResource, getResource } from "../../actions/resources";
import { getAssets } from '../../actions/assets'

let valueOfFilter = "";
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, .pdf, .doc, .docx, .xlsx, .xls';
const MaxSize = 1000000000 // bytes

export class Resource extends Component{

    fileInputRef = React.createRef();

    state = {
        name_resource: '',
        author: '',
        file: null,
        asset: undefined,
        search: ""
    };

    static propTypes ={
        getResource: PropTypes.func.isRequired,
        deleteResource: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getResource();
        this.props.getAssets();
        console.log("Tabla de Recursos:  ",this.props.resources);
        console.log("Tabla de Assets:  ",this.props.assets);
    }

    handleOptionSelect = event => {
        const options = event.target.value;
        console.log('Opcion ', options)
        if (options!==undefined){
            console.log('Entro al options')
            this.setState({
                asset: options
            });
        }else{
            this.props.createMessage({ categoriaNoMatched: "Seleccione un Activo "})
        }
    }
    
    verifyFile = (files, fi) => {
        if (files && fi.length > 0){
            const currentFile = files
            const currentFileSize = currentFile.size
            if(currentFileSize > MaxSize) {
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
                        file: currentFile
                    })
                }, false)
                myFileItemReader.readAsDataURL(currentFile)
                console.log(myFileItemReader);
            }
        }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e =>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name_resource', this.state.name_resource);
        form_data.append('author', this.state.author);
        form_data.append('file', this.state.file);
        form_data.append('asset', this.state.asset);
        this.props.addResource(form_data);
        this.setState({
            name_resource: '',
            author: '',
            file: null,
            asset: undefined,
            search: ""
        });
    }

    renderResource = res =>{
        return (
            <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.name_resource}</td>
                <td>{res.author}</td>
                <td>{res.file}</td>
                {this.props.assets.filter(asset => {
                    (asset.id === res.asset) ? valueOfFilter = asset.code : ""
                }) ? <td>{valueOfFilter}</td> : "" }
                
                <td><button onClick={this.props.deleteResource.bind(this, res.id)} className="btn btn-danger btn-sm">
                    {" "} Delete</button></td>
            </tr>
        )
    }

    changeSearch = e => this.setState({search: e.target.value});

    render(){

        const filteredResouce = this.props.resources.filter( resource =>{
            return resource.name_resource.toLowerCase().includes( this.state.search.toLowerCase() );
        });

        return(
            <Fragment>

                <div className="card card-body mt-4 mb-4">
                    <h2>Agregar una Recurso</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Nombre del Archivo: </label>
                            <input 
                                className="form-control"
                                type="text"
                                name="name_resource"
                                onChange={this.onChange}
                                value={this.state.name_resource}
                            />
                        </div>
                        <div className="form-group">
                            <label>Autor: </label>
                            <input 
                                className="form-control"
                                type="text"
                                name="author"
                                onChange={this.onChange}
                                value={this.state.author}
                            />
                        </div>
                        <div className="form-group">
                            <label>Archivo: </label>
                            <input 
                                ref={this.fileInputRef}
                                className="form-control"
                                type="file"
                                name="file"
                                accept={acceptedFileTypes}
                                multiple={false}
                                onChange={this.handleFileSelect}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Activos: </label>
                            
                            <select className="form-control" name="asset" onChange={this.handleOptionSelect}>
                            <option value={undefined}>Seleccione un Activo</option>
                                {this.props.assets.map(asset =>(
                                    <option key={asset.id} value={asset.id}>{asset.code}</option>
                                ))}
                            </select>
                        </div>
                                                
                        <div className="form-group">
                            <button className="btn btn-success" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>


                <h2>Recursos</h2>
                
                <div className="container">
                    <input
                        type="text"
                        placeholder="Search Resource"
                        onChange={this.changeSearch}
                    />
                    <div className="row">
                        <table className="table table-striped">
                            <thead>
                                <tr >
                                    <th>ID</th>
                                    <th>Nombre del Recurso</th>
                                    <th>Autor</th>
                                    <th>Archivo</th>
                                    <th>Activo</th>
                                    <th>Estado</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    filteredResouce.map( res =>{
                                        return this.renderResource(res)
                                    })
                                }
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
};

const mapStateToProps = state =>({
    resources: state.resources.resources,
    assets: state.assets.assets
});

export default connect(mapStateToProps, {getResource, deleteResource, getAssets, addResource})(Resource);
