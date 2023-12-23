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
      const updatedSupplier = await suppliersModels.update(id, supplier);

      return updatedSupplier;
    } catch (error) {
      console.error(`Error fetching customers: ${error.message}`);
      throw new Error("An error occurred while fetching customers.");
    }
  }

  // async destroy() {
  //   try {
  //   } catch (error) {
  //     console.error(`Error fetching customers: ${error.message}`);
  //     throw new Error("An error occurred while fetching customers.");
  //   }
  // }
}

export default new SuppleierServices();
