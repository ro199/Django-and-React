import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { getClass, deleteClass, addClass } from "../../actions/classAssets";
import { getType } from '../../actions/typesAssets'
import { createMessage } from "../../actions/messages";

let valueOfFilter = "";

export class Class extends Component{

    state = {
        name_class: '',
        unit_quantity: '',
        unit_price: '',
        asset_type: undefined
    };

    static propTypes = {
        getClass: PropTypes.func.isRequired,
        deleteClass: PropTypes.func.isRequired,
        addClass: PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getClass();
        this.props.getType();
        console.log("Tabla de Tipos:  ",this.props.types);
        console.log("Tabla de Clases:  ",this.props.classes);
    };

    handleOptionSelect = event => {
        const options = event.target.value;
        console.log('Opcion ', options)
        if (options!==undefined){
            this.setState({
                asset_type: options
            });
        }else{
            this.props.createMessage({ categoriaNoMatched: "Seleccione una categoria "})
        }
    }
        

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e =>{
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name_class', this.state.name_class);
        form_data.append('unit_quantity', this.state.unit_quantity);
        form_data.append('unit_price', this.state.unit_price);
        form_data.append('asset_type', this.state.asset_type);
        this.props.addClass(form_data);
        this.setState({
            name_class: '',
            unit_quantity: '',
            unit_price: '',
            asset_type: undefined
        });
    }

    render(){
        
        return(
            <Fragment>
                
                <div className="card card-body mt-4 mb-4">
                    <h2>Agregar una Sub-categoria</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Nombre de la Sub-Categoria: </label>
                            <input 
                                className="form-control"
                                type="text"
                                name="name_class"
                                onChange={this.onChange}
                                value={this.state.name_class}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cantidad: </label>
                            <input 
                                className="form-control"
                                type="number"
                                name="unit_quantity"
                                onChange={this.onChange}
                                value={this.state.unit_quantity}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio Unitario: </label>
                            <input 
                                className="form-control"
                                type="number"
                                name="unit_price"
                                onChange={this.onChange}
                                value={this.state.unit_price}
                            />
                        </div>
                        <div className="form-group">
                            <label>Categoria: </label>
                            
                            <select className="form-control" name="asset_type" onChange={this.handleOptionSelect}>
                            <option value={undefined}>Seleccione un categoria</option>
                                {this.props.types.map(type =>(
                                    <option key={type.id} value={type.id}>{type.name_type}</option>
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

                <h2>Sub-Categorias</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Sub-Categoria</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Categoria</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.classes.map(classs =>(
                            <tr key={classs.id}>
                                <td>{classs.id}</td>
                                <td>{classs.name_class}</td>
                                <td>{classs.unit_quantity}</td>
                                <td>{classs.unit_price}</td>
                               {this.props.types.filter(type => {
                                    (type.id === classs.asset_type) ? valueOfFilter = type.name_type : ""
                                }
                            ) ? <td>{valueOfFilter}</td> : console.log(':(') } 
                                <td><button onClick={this.props.deleteClass.bind(this, classs.id)} className="btn btn-danger btn-sm">
                                    {" "} Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    };

};

const mapStateToProps = state => ({
    classes: state.classes.classes,
    types: state.types.types
});

export default connect(mapStateToProps, {getClass, deleteClass, getType, addClass, createMessage})(Class);