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
      return createdCustomer;
    } catch (error) {
      throw new Error(`Error creating customer: ${error.message}`);
    }
  }

  async update(id, customer) {
    try {
      const updatedCustomer = await customerModels.update(id, customer);
      return updatedCustomer;
    } catch (error) {
      throw new Error(`Error updating customer: ${error.message}`);
    }
  }

  async destroy(id) {
    try {
      const destroyedCustomer = await customerModels.destroy(id);
      return destroyedCustomer;
    } catch (error) {
      throw new Error(`Error deleting customer: ${error.message}`);
    }
  }
}

export default new CustomerServices();
