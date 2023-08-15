import { useEffect, useState } from "react";
import { messageGenerator } from "../../utils/utils";
import { ArrVarNames, Template } from "../../types/types";

import "./Preview.scss";

const Preview = (props: { template: Template; arrVarNames: ArrVarNames }) => {
  const [message, setMessage] = useState("");
  const [listVar, setListVar] = useState<{ variable: string; value: string }[]>(
    []
  );
  const [mapState, setMapState] = useState(new Map());

  const updateMap = (key: string, value: string) => {
    setMapState((map) => new Map(map.set(key, value)));
  };

  const handleEvents = (e: any, index: number, variable: string) => {
    listVar[index].value = e.target.value;
    setListVar({ ...listVar });
    updateMap(variable, e.target.value);
  };

  useEffect(() => {
    const list: { variable: string; value: string }[] = [];
    if (Array.isArray(props.arrVarNames) && props.arrVarNames.length > 0) {
      props.arrVarNames.forEach((item: { variable: string; value: string }) => {
        list.push({
          variable: item.variable,
          value: item.value,
        });
      });
      setListVar(list);
    }
  }, [props.arrVarNames]);

  useEffect(() => {
    setMessage(messageGenerator(props.template.list, mapState));
  }, [props, mapState]);

  return (
    <div className="view-container">
      <h3 className="title">Message Preview</h3>
      <textarea
        className="textarea-text rounded read-only"
        name="message"
        id="message"
        rows={4}
        cols={40}
        readOnly
        defaultValue={message}
      />
      <div className="variables-block">
        <h4 className="center">Variables:</h4>
        <div className="variables-container">
          {Array.isArray(props.arrVarNames) && props.arrVarNames.length > 0 ? (
            props.arrVarNames.map((item, index) => (
              <div key={index} className="input-block rounded">
                <label className="label" htmlFor={item.variable}>
                  {item.variable}
                </label>
                <input
                  className="textarea-text rounded"
                  type="text"
                  name={item.variable}
                  id={item.variable}
                  value={listVar[index]?.value ? listVar[index]?.value : ""}
                  onChange={(e) => handleEvents(e, index, item.variable)}
                />
              </div>
            ))
          ) : (
            <div>Variables not defined</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
