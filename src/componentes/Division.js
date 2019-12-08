import React, { Component } from "react";
import Banner from "./Banner";
import Resultado from "./Resultado";
import { Link } from "react-router-dom";

export default class Suma extends Component {
  resultadoRef = React.createRef();
  state = {
    numeros: [2, 4, 6, 8, 10, 12],
    intentos: 0,
    acertadas: 0,
    falladas: 0
  };

  desordenarNumeros = () => {
    this.setState({
      numeros: this.state.numeros.sort(function() {
        return Math.random() - 0.5;
      })
    });
    console.log(this.state.numeros);
  };

  revisarResultado = e => {
    e.preventDefault();
    let resultado = this.state.numeros[0] / this.state.numeros[1];
    Math.trunc(resultado);
    if (resultado == this.resultadoRef.current.value) {
      this.setState({ acertadas: this.state.acertadas + 1 });
      alert("Excelente :)");
    } else {
      this.setState({ falladas: this.state.falladas + 1 });
      alert("Has fallado :(");
    }
    this.setState({ intentos: this.state.intentos + 1 });
    document.getElementById("numero").value = "";
    this.desordenarNumeros();
  };

  render() {
    return (
      <div>
        <Banner subtitulo="Prueba las Divisiones" />
        <form onSubmit={this.revisarResultado}>
          <div className="form-group">
            <input
              className="form-control col-4 mx-auto"
              disabled
              value={this.state.numeros[0]}
            />
          </div>
          <div className="text-center mb-3">
            <h2>/</h2>
          </div>
          <div className="form-group">
            <input
              className="form-control col-4 mx-auto"
              disabled
              value={this.state.numeros[1]}
            />
          </div>
          <div className="text-center mb-3">
            <h2>=</h2>
          </div>
          <div className="form-group">
            <input
              className="form-control col-4 mx-auto"
              required
              type="number"
              ref={this.resultadoRef}
              id="numero"
              step="0.01"
            />
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-success col-4" id="enviar">
              Revisar
            </button>
          </div>
        </form>
        <Link to="/" className="btn btn-info m-2 col-4 btn-block mx-auto">
          Inicio
        </Link>
        <div className="text-center">
          <p>Intentos {this.state.intentos}/5</p>
        </div>
        {this.state.intentos == 5 &&
          ((document.getElementById("numero").disabled = true),
          (document.getElementById("enviar").disabled = true),
          (
            <Link
              to="/Resultado"
              component={Resultado}
              acertadas={this.state.acertadas}
              falladas={this.state.falladas}
            ></Link>
          ))}
      </div>
    );
  }
}
