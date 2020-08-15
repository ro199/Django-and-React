import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAssets, deleteAsset} from '../../actions/assets';
 
export class Assets extends Component{
    static propTypes = {
        assets: PropTypes.array.isRequired,
        getAssets: PropTypes.func.isRequired,
        deleteAsset: PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.getAssets();
    }

    state = {
        search: ""
    }

    changeSearch = e => this.setState({search: e.target.value});

    renderAsset = res =>{
        return (
            <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.code}</td>
                <td>{res.description}</td>
                <td>{res.purchase_date}</td>
                <td>{res.purchase_value}</td>
                <td>{res.lifespan}</td>
                <td><button onClick={this.props.deleteAsset.bind(this, res.id)} className="btn btn-danger btn-sm">
                    {" "} Delete</button></td>
            </tr>
        )
    }

    render() {

        const filteredAsset = this.props.assets.filter( asset =>{
            return asset.code.toLowerCase().includes( this.state.search.toLowerCase() );
        });

        return (
            <Fragment>

                <h2>Assets</h2>

                <div className="container">
                    <input
                        type="text"
                        placeholder="Search Asset"
                        onChange={this.changeSearch}
                    />
                    <div className="row">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>code</th>
                                    <th>description</th>
                                    <th>purchase_date</th>
                                    <th>purchase_value</th>
                                    <th>lifespan</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    filteredAsset.map( res =>{
                                        return this.renderAsset(res)
                                    })
                                }
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    assets: state.assets.assets
});

export default connect(mapStateToProps, { getAssets, deleteAsset })(Assets); 