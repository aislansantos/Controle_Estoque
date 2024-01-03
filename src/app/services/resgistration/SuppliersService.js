import suppliersModels from "../../models/registrations/Supplier";

class SuppleierServices {
  async index() {
    try {
      const suppliers = await suppliersModels.index();

      if (suppliers) {
        return suppliers;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching suppliers: ${error.message}`);
      throw new Error("An error occurred while fetching suppliers.");
    }
  }

  async show(id) {
    try {
      const supplier = await suppliersModels.show(id);

      if (supplier) {
        return supplier;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching supplier: ${error.message}`);
      throw new Error("An error occurred while fetching supplier.");
    }
  }

  async create(supplier) {
    try {
      const createdSupplier = await suppliersModels.create(supplier);

      if (createdSupplier) {
        return createdSupplier;
      }

      return null;
    } catch (error) {
      console.error(`Error create supplier: ${error.message}`);
      throw new Error("An error occurred while create supplier.");
    }
  }

  async update(id, supplier) {
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
      console.error(`Error fetching customers: ${error.message}`);
      throw new Error("An error occurred while fetching customers.");
    }
  }

  async destroy(id) {
    try {
      const destroyedSupplier = await suppliersModels.destroy(id);

      return destroyedSupplier;
    } catch (error) {
      console.error(`Error fetching customers: ${error.message}`);
      throw new Error("An error occurred while fetching customers.");
    }
  }
}

export default new SuppleierServices();
