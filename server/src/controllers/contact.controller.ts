import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase';
import { AppError } from '../middleware/errorHandler';

interface CustomerContactData {
  customer_code: number;
  contact_name: string;
  position?: string;
  rating?: number;
  phone_number?: string;
  created_by_agent_id: number;
  updated_by_agent_id: number;
  updated_at?: string;
}

/**
 * Create a new customer contact record
 * @route   POST /api/contacts/create
 * @access  Private
 */
export const createCustomerContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      customerCode,
      contactName,
      position,
      rating,
      phoneNumber,
      createdByAgentId
    } = req.body;
    
    // Prepare data for insertion
    const contactData: CustomerContactData = {
      customer_code: customerCode,
      contact_name: contactName,
      position,
      rating,
      phone_number: phoneNumber,
      created_by_agent_id: createdByAgentId,
      updated_by_agent_id: createdByAgentId // Initially same as created_by
    };
    
    // Start a transaction to handle both contact creation and phone number logic
    const { data: contact, error: contactError } = await supabase
      .from('customer_contacts')
      .insert([contactData])
      .select('id')
      .single();
    
    // Handle database error
    if (contactError) {
      console.error('Supabase error (contact creation):', contactError);
      return next(new AppError('Database error during contact creation', 500));
    }
    
    // Handle phone number logic if provided
    let phoneAdded = false;
    if (phoneNumber) {
      // Check if phone number already exists for this customer
      const { data: existingPhone, error: phoneCheckError } = await supabase
        .from('phone')
        .select('id')
        .eq('customer_code', customerCode)
        .eq('phone_number', phoneNumber)
        .single();
      
      if (phoneCheckError && phoneCheckError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
        console.error('Supabase error (phone check):', phoneCheckError);
        // Continue despite error in phone check
      }
      
      // If phone doesn't exist, add it
      if (!existingPhone) {
        const { error: phoneInsertError } = await supabase
          .from('phone')
          .insert([{
            customer_code: customerCode,
            phone_number: phoneNumber
          }]);
        
        if (phoneInsertError) {
          console.error('Supabase error (phone insert):', phoneInsertError);
          // Continue despite error in phone insert
        } else {
          phoneAdded = true;
        }
      }
    }
    
    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Customer contact created successfully',
      contactId: contact?.id,
      phoneAdded
    });
  } catch (error) {
    console.error('Contact creation error:', error);
    return next(new AppError('Server error during contact creation', 500));
  }
};

/**
 * Update an existing customer contact record
 * @route   PUT /api/contacts/update/:id
 * @access  Private
 */
export const updateCustomerContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      customerCode,
      contactName,
      position,
      rating,
      phoneNumber,
      updatedByAgentId
    } = req.body;
    
    // Prepare data for update
    const contactData: Partial<CustomerContactData> = {
      customer_code: customerCode,
      contact_name: contactName,
      position,
      rating,
      phone_number: phoneNumber,
      updated_by_agent_id: updatedByAgentId,
      updated_at: new Date().toISOString() // Update the timestamp
    };
    
    // Remove undefined fields
    Object.keys(contactData).forEach(key => {
      if (contactData[key as keyof CustomerContactData] === undefined) {
        delete contactData[key as keyof CustomerContactData];
      }
    });
    
    // Update data in customer_contacts table
    const { data: contact, error: contactError } = await supabase
      .from('customer_contacts')
      .update(contactData)
      .eq('id', id)
      .select('id')
      .single();
    
    // Handle database error
    if (contactError) {
      console.error('Supabase error (contact update):', contactError);
      return next(new AppError('Database error during contact update', 500));
    }
    
    // Handle phone number logic if provided
    let phoneAdded = false;
    if (phoneNumber) {
      // Check if phone number already exists for this customer
      const { data: existingPhone, error: phoneCheckError } = await supabase
        .from('phone')
        .select('id')
        .eq('customer_code', customerCode)
        .eq('phone_number', phoneNumber)
        .single();
      
      if (phoneCheckError && phoneCheckError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
        console.error('Supabase error (phone check):', phoneCheckError);
        // Continue despite error in phone check
      }
      
      // If phone doesn't exist, add it
      if (!existingPhone) {
        const { error: phoneInsertError } = await supabase
          .from('phone')
          .insert([{
            customer_code: customerCode,
            phone_number: phoneNumber
          }]);
        
        if (phoneInsertError) {
          console.error('Supabase error (phone insert):', phoneInsertError);
          // Continue despite error in phone insert
        } else {
          phoneAdded = true;
        }
      }
    }
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Customer contact updated successfully',
      contactId: contact?.id,
      phoneAdded
    });
  } catch (error) {
    console.error('Contact update error:', error);
    return next(new AppError('Server error during contact update', 500));
  }
};
