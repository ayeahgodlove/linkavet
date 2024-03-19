import { Badge, Card, Col, List, Row, TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import { useAppointment } from "hooks/health/appointment.hook";
import { useUser } from "hooks/user.hook";
import React from "react";

const AppointmentDetailComponent: React.FC = () => {
  const { appointment } = useAppointment();
  const { getUser } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Appointment Time",
            value: (
              <TimePicker value={dayjs(appointment.appointmentTime)} />
            ),
          },
          {
            label: "Duration Minutes",
            value: appointment.durationMinutes,
          },
          {
            label: "Is Comfirmed?",
            value: appointment.isConfirmed ? (
              <Badge color="green" text="YES" />
            ) : (
              <Badge color="red" text="NO" />
            ),
          },
          {
            label: "Vet Owner",
            value: getUser(appointment.userId).username,
          },
          {
            label: "Vet Doctor",
            value: getUser(appointment.doctorId).username,
          },
          {
            label: "Email",
            value: appointment.email,
          },
          {
            label: "Contact",
            value: appointment.contact,
          },
          {
            label: "Symptoms",
            value: appointment.symptoms,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AppointmentDetailComponent;
