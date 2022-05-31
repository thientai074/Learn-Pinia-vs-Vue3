import { Customer } from "../models/customer.model";

class CustomerService {
  // Create new customer
  async create(decoded: any, phone: string) {
    try {
      if (decoded) {
        const newCustomer = await new Customer({
          user: decoded.id,
          phone,
        });
        const savedCustomer = await newCustomer.save();
        return {
          success: true,
          data: savedCustomer,
          message: "Created customer successfully",
        };
      } else {
        return {
          success: false,
          message: "Has not logged in yet !!!",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error while creating new customer",
      };
    }
  }

  // find all customers
  async findAllCustomers() {
    try {
      const customers = await Customer.find().populate(
        "user",
        "email fullName"
      );
      return {
        success: true,
        data: customers,
        message: "Getted customers successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while searching new customer",
      };
    }
  }

  // delete customer
  async delete(userId: string) {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(userId);
      return {
        success: true,
        data: deletedCustomer,
        message: "Deleted this customer successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting new customer",
      };
    }
  }

  // Update Customer
  async update(userId: string, body: any) {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        userId,
        {
          $set: body,
        },
        { new: true }
      );
      return {
        success: true,
        data: updatedCustomer,
        message: "Updated this customer successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating new customer",
      };
    }
  }
}

export default new CustomerService();
