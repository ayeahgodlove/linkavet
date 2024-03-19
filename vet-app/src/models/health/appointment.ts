import dayjs from "dayjs";
import { IBaseState } from "models/base-state.model";
import { IResponseBase } from "models/response-base.model";
import { STATUS } from "models/shared/status.enum";

export interface IAppointment {
  id: string;
  userId: string;
  doctorId: string;
  appointmentDate: Date;
  appointmentTime: Date;
  isConfirmed: boolean;
  fullName: string;
  email: string;
  contact: string;
  symptoms: string;
  status: string;
  roomId: string;
}

export const emptyAppointment: IAppointment = {
  id: "",
  userId: "",
  doctorId: "",
  appointmentDate: dayjs(new Date()) as any,
  isConfirmed: false,
  appointmentTime: dayjs(new Date()) as any,
  fullName: "",
  email: "",
  contact: "",
  symptoms: "",
  status: STATUS.PENDING,
  roomId: ""
};

export interface IAppointmentState extends IBaseState {
  readonly appointments: IAppointment[];
  readonly appointment: IAppointment;
}

export interface IAppointmentResponse extends IResponseBase {
  data: IAppointment;
}

export interface IAppointmentResponses extends IResponseBase {
  data: IAppointment[];
}
