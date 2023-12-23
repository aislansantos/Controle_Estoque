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
      throw new Error(`Error creating customer: ${error.message}`);
    }
  }

  async update(id, customer) {
    try {
      const customerUpdate = await customerModels.show(id);

      const { name, email, city } = customer;

      const updateFields = [];
      const updateValues = [];

      if (name !== undefined) {
        updateFields.push(`name = $${updateValues.length + 1}`);
        updateValues.push(name);
      }

      if (email !== undefined) {
        updateFields.push(`email = $${updateValues.length + 1}`);
        updateValues.push(email);
      }

      if (city !== undefined) {
        updateFields.push(`city = $${updateValues.length + 1}`);
        updateValues.push(city);
      }

      const idField = `id = $${updateValues.length + 1}`;

      const fieldsTitles = `${updateFields.join(", ")}`;

      await customerModels.update(id, idField, fieldsTitles, updateValues);
      return customerUpdate;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw new Error("An error while updating a customer.");
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
