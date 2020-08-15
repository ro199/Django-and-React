import React, {Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBrands, deleteBrands, addBrands } from "../../actions/brands";

export class Brands extends Component {

    state = {
        name_brand: '',
        description: '',
    };

    static propTypes = {
        getBrands: PropTypes.func.isRequired,
        deleteBrands: PropTypes.func.isRequired,
        addBrands: PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getBrands();
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    onSubmit = e => {
        e.preventDefault();
        const { name_brand, description} = this.state;
        const brand = {name_brand, description};
        this.props.addBrands(brand);
        this.setState({
            name_brand: '',
            description: '',
        });

    }

    render(){
        const {name_brand, description} = this.state;
        return(
            <Fragment>
                <div className="card card-body mt-4 mb-4">
                    <h2>Agregar una Marca</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Nombre de la Marca: </label>
                            <input 
                                className="form-control"
                                type="text"
                                name="name_brand"
                                onChange={this.onChange}
                                value={name_brand}
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripcion: </label>
                            <input 
                                className="form-control"
                                type="text"
                                name="description"
                                onChange={this.onChange}
                                value={description}
                            />
                        </div>
                        
                        <div className="form-group">
                            <button className="btn btn-success" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <h2>Brands</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Marca</th>
                            <th>Descripcion</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.brands.map(brand =>(
                            <tr key={brand.id}>
                                <td>{brand.id}</td>
                                <td>{brand.name_brand}</td>
                                <td>{brand.description}</td>
                                <td><button onClick={this.props.deleteBrands.bind(this, brand.id)} className="btn btn-danger btn-sm">
                                    {" "} Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    };
};

const mapStateToProps = state =>({
    brands: state.brands.brands
});

export default connect(mapStateToProps, { getBrands, deleteBrands, addBrands })(Brands);