import customersModel from '../models/CustomerModels';

class CustomerController {
  // Listagem dos Customers
  this.index(req, res) {
    return res.status(200).json({ message: 'Acessado método listagem Customers' });
  }

  // Recupera um Customer
  show(req, res) {

  }

  // Cria um novo Customer
  create(req, res) {

  }

  // Atualiza um Customer
  update(req, res) {

  }

  // Exclui um Customer
  destroy(req, res) {

  }
}

export default new CustomerController();
