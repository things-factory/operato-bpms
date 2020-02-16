import { ProcessEngineManager } from './process-engine-manager'

export function startEngine() {
  setTimeout(function() {
    ProcessEngineManager.launchProcess(
      {
        name: 'test-process',
        model: `
      <?xml version="1.0" encoding="UTF-8"?>
      <definitions id="testProcess" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <process id="theProcess1" isExecutable="true">
          <startEvent id="theStart" />
          <exclusiveGateway id="decision" default="flow2" />
          <endEvent id="end1" />
          <endEvent id="end2" />
          <sequenceFlow id="flow1" sourceRef="theStart" targetRef="decision" />
          <sequenceFlow id="flow2" sourceRef="decision" targetRef="end1" />
          <sequenceFlow id="flow3withExpression" sourceRef="decision" targetRef="end2">
            <conditionExpression xsi:type="tFormalExpression">\${environment.services.isBelow(environment.variables.input,2)}</conditionExpression>
          </sequenceFlow>
        </process>
      </definitions>
      `
      },
      {
        id: Math.floor(Math.random() * 10000)
      }
    )
  }, 15000)
}
