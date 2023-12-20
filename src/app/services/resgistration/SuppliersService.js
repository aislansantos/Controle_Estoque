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
      throw new Error("An error occurred while fetching customers.");
    }
  }

  // async show() {
  //   try {
  //   } catch (error) {
  //     console.error(`Error fetching customers: ${error.message}`);
  //     throw new Error("An error occurred while fetching customers.");
  //   }
  // }

  // async create() {
  //   try {
  //   } catch (error) {
  //     console.error(`Error fetching customers: ${error.message}`);
  //     throw new Error("An error occurred while fetching customers.");
  //   }
  // }

  // async update() {
  //   try {
  //   } catch (error) {
  //     console.error(`Error fetching customers: ${error.message}`);
  //     throw new Error("An error occurred while fetching customers.");
  //   }
  // }

  // async destroy() {
  //   try {
  //   } catch (error) {
  //     console.error(`Error fetching customers: ${error.message}`);
  //     throw new Error("An error occurred while fetching customers.");
  //   }
  // }
}

export default new SuppleierServices();
