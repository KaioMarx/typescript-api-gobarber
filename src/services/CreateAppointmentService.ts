import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import User from '../models/User';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const userRepository = getRepository(User);

    const dateFormatted = startOfHour(date);

    const isHourBusy = await appointmentRepository.findByDate(dateFormatted);

    if (isHourBusy) {
      throw new Error('Sorry that hour is busy for another client');
    }

    const isProvider = await userRepository.findOne({
      where: {
        provider_id,
        isProvider: true,
      },
    });

    if (!isProvider) {
      throw new Error('Sorry, Select a valid Provider User');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: dateFormatted,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
