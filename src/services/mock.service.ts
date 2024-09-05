import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import ExceptionLogModel from '../models/ExceptionLog.model';
import { ActionType, EntityLog } from '../models/entityLog.model';

export async function exceptionsMockData() {
  try {

    const mockData = Array.from({ length: 10 }).map(() => ({
      timestamp: faker.date.recent(),
      service: new mongoose.Types.ObjectId(), // Assuming you'll replace this with actual service IDs
      exceptionType: faker.hacker.phrase(),
      environment: faker.helpers.arrayElement(['production', 'staging', 'development']),
      message: faker.lorem.sentence(),
      stackTrace: faker.lorem.paragraph(),
      language: faker.helpers.arrayElement(['JavaScript', 'TypeScript', 'Python', 'Java']),
      context: { userId: faker.string.uuid(), action: faker.hacker.verb() },
      resolved: faker.datatype.boolean(),
      resolutionDetails: faker.lorem.sentence(),
    }));

    const result = await ExceptionLogModel.insertMany(mockData);
    console.log('Mock data created:', result);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creating mock data:', error);
  }
}

export async function EntityMockData() {
    try {
  
      const mockData = Array.from({ length: 10 }).map(() => ({
        service: new mongoose.Types.ObjectId(), // Replace with actual service IDs
        entityName: faker.company.name(), // Generating a fake entity name
        action: faker.helpers.arrayElement(Object.values(ActionType)), // Randomly select an action type
        timestamp: faker.date.recent(),
        userId: faker.string.uuid(),
        userName: faker.person.fullName(),
        changes: {
          field: faker.database.column(),
          oldValue: faker.lorem.word(),
          newValue: faker.lorem.word(),
        },
      }));
  
      const result = await EntityLog.insertMany(mockData);
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error creating mock data:', error);
    }
}