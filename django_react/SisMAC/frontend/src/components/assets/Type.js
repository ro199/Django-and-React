import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getType, deleteType, addType} from "../../actions/typesAssets";

export class Types extends Component{

    state = {
        name_type: '',
    }
    
    static propTypes = {
        getType: PropTypes.func.isRequired,
        deleteType: PropTypes.func.isRequired,
        addType: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getType();
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = e =>{
        e.preventDefault();
        const {name_type} = this.state;
        const type = {name_type};
        this.props.addType(type);
        this.setState({
            name_type: '',
        });
    }

    render(){
        const {name_type} = this.state;

        return (
            <Fragment>
                <div className="card card-body mt-4 mb-4">
                    <h2>Agregar una Categoria</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Nombre de la Categoria: </label>
                            <input 
                                className="form-control"
                                type="text"
                                name="name_type"
                                onChange={this.onChange}
                                value={name_type}
                            />
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-success" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <h2>Categorias</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Categoria</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.types.map(types =>(
                            <tr key={types.id}>
                                <td>{types.id}</td>
                                <td>{types.name_type}</td>
                                <td><button onClick={this.props.deleteType.bind(this, types.id)} className="btn btn-danger btn-sm">
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
    types: state.types.types
});

export default connect(mapStateToProps, {getType, deleteType, addType})(Types);

