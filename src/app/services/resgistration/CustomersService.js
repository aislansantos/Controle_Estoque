import customerModels from "../../models/registrations/Customer";

const messages = {
  consoleError: (action) => `Error ${action} customer:`,
  anErrorOccurred: (action) => `An error occurred while ${action} customer.`,
};

class CustomerServices {
  async index() {
    const action = "fetching";
    try {
      const customers = await customerModels.index();

      if (customers) {
        return customers;
      }

      return null;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async show(id) {
    const action = "fetching";
    try {
      const customer = await customerModels.show(id);

      if (customer) {
        return customer;
      }
      return null;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.consoleError(action));
    }
  }

  async create(customer) {
    const action = "creating";
    try {
      const createdCustomer = await customerModels.create(customer);

      if (createdCustomer) {
        return createdCustomer;
      }

      return null;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.consoleError(action), error.message);
    }
  }

  async update(id, customer) {
    const action = "updating";
    try {
      const customerUpdate = await customerModels.show(id); // mostra os dados do customer antes da atualização
      const { name, email, city } = customer;

      // console.log(customer);

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
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async destroy(id) {
    const action = "deleting";
    try {
      const destroyedCustomer = await customerModels.destroy(id);

      return destroyedCustomer;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }
}

export default new CustomerServices();
