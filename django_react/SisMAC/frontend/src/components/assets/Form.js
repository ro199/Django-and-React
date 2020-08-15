import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addAsset } from '../../actions/assets'


export class Form extends Component{
    state = {
        code: '',
        description: '',
        purchase_date: '',
        purchase_value: '',
    };

    static propTypes = {
        addAsset: PropTypes.func.isRequired
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();

        const { code, description, purchase_date, purchase_value } = this.state;
        const asset = { code, description, purchase_date, purchase_value };
        this.props.addAsset(asset);
        this.setState({
            code: '',
            description: '',
            purchase_date: '',
            purchase_value: '',
        });
    };

    render() {
        const {code, description, purchase_date, purchase_value} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Asset</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Codigo: </label>
                        <input 
                            className="form-control"
                            type="text"
                            name="code"
                            onChange={this.onChange}
                            value={code}
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
                        <label>Fecha de compra: </label>
                        <input 
                            className="form-control"
                            type="date"
                            name="purchase_date"
                            onChange={this.onChange}
                            value={purchase_date}
                        />
                    </div>

                    <div className="form-group">
                        <label>Valor de compra: </label>
                        <input 
                            className="form-control"
                            type="number"
                            name="purchase_value"
                            onChange={this.onChange}
                            value={purchase_value}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-success" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
export default connect(null, {addAsset})(Form);