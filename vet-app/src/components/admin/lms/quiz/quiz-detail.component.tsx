import { Card, Col, List, Row, Typography } from "antd";
import { useCourse } from "../../../../hooks/lms/course.hook";
import { useQuiz } from "../../../../hooks/lms/quiz.hook";
import { useUser } from "../../../../hooks/user.hook";
import React from "react";

const QuizDetailComponent: React.FC = () => {
  const { quiz } = useQuiz();
  const { getCourse } = useCourse();
  const { getUser } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Code",
            value: quiz.id,
          },
          {
            label: "Question",
            value: quiz.question,
          },
          {
            label: "Answers",
            value: quiz.answers.map((ans, index) => (
              <Typography.Text key={index}>{ans}</Typography.Text>
            )),
          },
          {
            label: "Correct Answer",
            value: quiz.answers[quiz.correctAnswerIndex],
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

export default QuizDetailComponent;
