import { Request, Response } from "express";
import CustomerService from "../services/customer.service";

class customerController {
  // create customer
  async createCustomer(req: Request, res: Response) {
    try {
      const { phone } = req.body;
      // Phone Number belike 083729202
      const reg = new RegExp("^[0-9]+$");
      const testOnlyNumberInPhone = reg.test(phone);
      if (!testOnlyNumberInPhone) {
        return res.json({
          success: false,
          message: "Invalid phone number",
        });
      }
      const decoded = res.locals.jwt;
      if (!decoded) {
        return res.json({ success: false, message: "You have to login" });
      }

      const newCustomer = await CustomerService.create(decoded, phone);
      res.json(newCustomer);
    } catch (error) {
      return res.json({
        success: false,
        message: "Creating customer failed",
      });
    }
  }

  // find all customers
  async findAllUser(req: Request, res: Response) {
    try {
      const customers = await CustomerService.findAllCustomers();
      res.json(customers);
    } catch (error) {
      return res.json({
        success: false,
        message: "Getting all customers successfully failed",
      });
    }
  }

  // delete customer
  async deleteCustomer(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const deletedCustomer = await CustomerService.delete(userId);
      res.json(deletedCustomer);
    } catch (error) {
      return res.json({
        success: false,
        message: "Deleting customer failed",
      });
    }
  }

  // Update Customer
  async updateCustomer(req: Request, res: Response) {
    try {
      const body = req.body;
      const userId = req.params.id;
      const updatedCustomer = await CustomerService.update(userId, body);
      res.json(updatedCustomer);
    } catch (error) {
      console.log(error)
      return res.json({
        success: false,
        message: "Updating customer failed",
      });
    }
  }
}

export default new customerController();
