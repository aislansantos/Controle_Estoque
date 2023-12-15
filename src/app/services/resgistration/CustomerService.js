import customerModels from "../../models/registrations/Customer";

class CustomerServices {
  async index() {
    try {
      const customers = await customerModels.index();

      if (customers) {
        return customers;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching customers: ${error.message}`);
      throw new Error("An error occurred while fetching customers.");
    }
  }

  async show(id) {
    try {
      const customer = await customerModels.show(id);

      if (customer) {
        return customer;
      }
      return null;
    } catch (error) {
      throw new Error(`Error fetching customer: ${error.message}`);
    }
  }

  async create(customer) {
    try {
      const createdCustomer = await customerModels.create(customer);

      if (createdCustomer) {
        return createdCustomer;
      }

      return null;
    } catch (error) {
      throw new Error(`Error fetching customer: ${error.message}`);
    }
  }

  // async update(id, customer) {
  //   try {
  //   } catch (error) {}
  // }

  // async show() {
  //   try {
  //   } catch (error) {}
  // }

  // async show() {
  //   try {
  //   } catch (error) {}
  // }
}

export default new CustomerServices();
