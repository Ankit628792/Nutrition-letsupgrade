import React, { Component } from 'react'



export default class Food extends Component {

    constructor(props) {
        super(props);

        this.state = {
            food: [],
            searchedFood: [],
            currentFood: {
                Name: '-',
                Calories: 0,
                Protein: 0,
                Carbs: 0,
                Fats: 0,
                Fibre: 0,
                Weight: 0
            }
        }
    }


    componentDidMount() {
        fetch("http://localhost:8000/food")
            .then((response => response.json()))
            .then((foodResponse) => {
                this.setState({ food: foodResponse })
            })
            .catch((e) => {
                console.log(e);
            })
    }

    selectFood(food) {
        this.setState({ currentFood: food });
    }

    calculateChanges(weight) {

        //also  if(weight !== "" && weight !== 0);

        let currFood = this.state.currentFood;
        currFood.Calories = (currFood.Calories * weight) / currFood.Weight;
        currFood.Carbs = (currFood.Carbs * weight) / currFood.Weight;
        currFood.Protein = (currFood.Protein * weight) / currFood.Weight;
        currFood.Fats = (currFood.Fats * weight) / currFood.Weight;
        currFood.Fibre = (currFood.Fibre * weight) / currFood.Weight;
        currFood.Weight = weight;

        this.setState({ currentFood: currFood });

    }

    searchFood(value) {
        if (value !== "") {
            let searchedFood = this.state.food.filter((food, index) => {
                return food.Name.toLowerCase().includes(value.toLowerCase());
            });
            this.setState({ searchedFood: searchedFood })
        } else {
            this.setState({ searchedFood: [] })
        }
    }

    render() {
        return (
            <div className="container p-4" style={{background: '#FFF', boxShadow: '5px 5px 20px rgba(213, 216, 220)'}}>
                <div className="row p-4 text-center d-flex justify-content-center">
                    <div className="col-lg-8">
                        <div className="form-group my-5">
                            <input type="text" onChange={(event) => this.searchFood(event.target.value)} className="form-control" placeholder="Search Food" />
                        </div>
                        <div className="search__result">
                            {
                                this.state.searchedFood.map((food, index) => {
                                    return (<div className="result my-2" style={{cursor: 'pointer', background: '#EAF2F8', display: 'grid', placeItems: 'center'}} key={index} onClick={() => { this.selectFood(food) }}>
                                       <p className="lead" style={{lineHeight: 1.4}}> {food.Name} </p>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="product-display py-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Calories</td>
                                <td>Protein</td>
                                <td>Carbs</td>
                                <td>Fibre</td>
                                <td>Fat</td>
                                <td>Weight</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.currentFood.Name}</td>
                                <td>{this.state.currentFood.Calories.toFixed(2)}</td>
                                <td>{this.state.currentFood.Protein.toFixed(2)}</td>
                                <td>{this.state.currentFood.Carbs.toFixed(2)}</td>
                                <td>{this.state.currentFood.Fibre.toFixed(2)}</td>
                                <td>{this.state.currentFood.Fats.toFixed(2)}</td>
                                <td> <input type="text" defaultValue={this.state.currentFood.Weight}
                                    onChange={(event) => {
                                        let weight = event.target.value;
                                        if (weight !== "") {
                                            this.calculateChanges(event.target.value)
                                        }
                                    }} /> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
