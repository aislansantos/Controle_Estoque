import suppliersModels from "../../models/registrations/Supplier";

const messages = {
  consoleError: (action) => `Error ${action} supplier:`,
  anErrorOccurred: (action) => `An error occurred while ${action} supplier.`,
};

class SuppleierServices {
  async index() {
    const action = "fetching";
    try {
      const suppliers = await suppliersModels.index();

      if (suppliers) {
        return suppliers;
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
      const supplier = await suppliersModels.show(id);

      if (supplier) {
        return supplier;
      }

      return null;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async create(supplier) {
    const action = "creating";
    try {
      const createdSupplier = await suppliersModels.create(supplier);

      if (createdSupplier) {
        return createdSupplier;
      }

      return null;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async update(id, supplier) {
    const action = "updating";
    try {
      const supplierUpdate = await suppliersModels.show(id); // mostra os dados do supplier antes da atualização
      const { name, email } = supplier;

      const updateFields = [];
      const updateValues = [];

      if (name !== undefined) {
        updateFields.push(`name = $${updateValues.length + 1}`); // exemplo name = $1
        updateValues.push(name);
      }

      if (email !== undefined) {
        updateFields.push(`email = $${updateValues.length + 1}`); // ex. email = $2
        updateValues.push(email);
      }

      const idField = `id = $${updateValues.length + 1}`; // ex. id = $3
      const fieldsTittles = `${updateFields.join(", ")}`;

      await suppliersModels.update(id, idField, fieldsTittles, updateValues);

      return supplierUpdate;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async destroy(id) {
    const action = "destroying";
    try {
      const destroyedSupplier = await suppliersModels.destroy(id);

      return destroyedSupplier;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }
}

export default new SuppleierServices();
