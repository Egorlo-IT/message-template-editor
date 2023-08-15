import { v4 as uuidv4 } from "uuid";

export const Colors = {
  RED: "#ff3366",
  GREEN: "#cbe573",
  BLACK: "#0a0d0f",
};

export const Action = {
  SUCCESS: {
    mess: "Template saved successfully",
    color: Colors.GREEN,
  },
  ERROR: {
    mess: "An unexpected error has occurred. Try saving the template later.",
    color: Colors.RED,
  },
};

/**
 * Рекурсивная функция, перебирающая все вложенные массивы и объекты,
 * для поиска елемента по идентификатору и замены текста на значение
 * из параметра valueForReplace. Применяется для работы с переменными
 * и текстом в шаблоне.
 *  @param {any} data - массивы и объекты шаблона сообщений
 *  @param {string} target - Идентификатор элемента
 *  @param {string} valueForReplace - Идентификатор элемента
 */
export const findObjectAndReplaceInNestedArray = (
  data: any,
  target: { id: string | undefined },
  valueForReplace?: string
) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i]?.children)) {
        findObjectAndReplaceInNestedArray(
          data[i].children,
          target,
          valueForReplace
        );
      } else if (typeof data[i] === "object") {
        if (JSON.stringify(data[i].id) === JSON.stringify(target.id)) {
          data[i].text.value = valueForReplace;
        }
      }
    }
  } else if (JSON.stringify(data.id) === JSON.stringify(target.id)) {
    data.text.value = valueForReplace;
  } else if (Array.isArray(data?.children)) {
    findObjectAndReplaceInNestedArray(data?.children, target, valueForReplace);
  }
};

/**
 * Рекурсивная функция, перебирающая все вложенные массивы и объекты,
 * для поиска елемента по идентификатору и добавления дочернего массива
 * с разбивкой сообщения в искомого элемента на два блока. Применяется для
 * добавления условий с разбивкой блоков шаблона.
 *  @param {any} data - массивы и объекты шаблона сообщений
 *  @param {string} target - Идентификатор элемента
 *  @param {string} firstValue - Идентификатор элемента
 *  @param {string} secondValue - Идентификатор элемента
 */
export const findObjectAndAddInNestedArray = (
  data: any,
  target: { id: string | undefined },
  firstValue: string,
  secondValue: string
) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (Array.isArray(data[i]?.children)) {
        findObjectAndAddInNestedArray(
          data[i].children,
          target,
          firstValue,
          secondValue
        );
      } else if (typeof data[i] === "object") {
        if (JSON.stringify(data[i].id) === JSON.stringify(target.id)) {
          data[i].children = [
            {
              children: null,
              id: uuidv4(),
              parent_id: target.id,
              text: { value: firstValue },
              type: "TEXT",
            },
            {
              children: null,
              id: uuidv4(),
              parent_id: target.id,
              text: { value: "" },
              type: "IF",
            },
            {
              children: null,
              id: uuidv4(),
              parent_id: target.id,
              text: { value: "" },
              type: "THEN",
            },
            {
              children: null,
              id: uuidv4(),
              parent_id: target.id,
              text: { value: "" },
              type: "ELSE",
            },
            {
              children: null,
              id: uuidv4(),
              parent_id: target.id,
              text: { value: secondValue },
              type: "TEXT",
            },
          ];
        }
      }
    }
  } else if (JSON.stringify(data.id) === JSON.stringify(target.id)) {
    data.children = [
      {
        children: null,
        id: uuidv4(),
        parent_id: target.id,
        text: { value: firstValue },
        type: "TEXT",
      },
      {
        children: null,
        id: uuidv4(),
        parent_id: target.id,
        text: { value: "" },
        type: "IF",
      },
      {
        children: null,
        id: uuidv4(),
        parent_id: target.id,
        text: { value: "" },
        type: "THEN",
      },
      {
        children: null,
        id: uuidv4(),
        parent_id: target.id,
        text: { value: "" },
        type: "ELSE",
      },
      {
        children: null,
        id: uuidv4(),
        parent_id: target.id,
        text: { value: secondValue },
        type: "TEXT",
      },
    ];
  } else if (Array.isArray(data?.children)) {
    findObjectAndAddInNestedArray(
      data?.children,
      target,
      firstValue,
      secondValue
    );
  }
};

/**
 * Рекурсивная функция, перебирающая все вложенные массивы и объекты,
 * для поиска елемента по идентификатору и удаления соответствующего элемента
 * (дочернего массива).
 *  @param {any} data - массивы и объекты шаблона сообщений
 *  @param {string} target - Идентификатор элемента
 */
export const findObjectAndDeleteInNestedArray = (
  data: any,
  target: { id: string }
) => {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      if (JSON.stringify(data[i].id) === JSON.stringify(target.id)) {
        data[i].children = null;
      }
      if (Array.isArray(data[i]?.children)) {
        findObjectAndDeleteInNestedArray(data[i].children, target);
      } else if (typeof data[i] === "object") {
        if (JSON.stringify(data[i].id) === JSON.stringify(target.id)) {
          data[i].children = null;
        }
      }
    }
  } else if (JSON.stringify(data.id) === JSON.stringify(target.id)) {
    data.children = null;
  } else if (Array.isArray(data?.children)) {
    findObjectAndDeleteInNestedArray(data?.children, target);
  }
};

/**
 * Функция, запускающая внутреннюю рекурсивную функцию generator
 * и возвращающая результирующий текст сообщения из заданного в параметре data
 * шаблона. Применяется для генерации сообщений из шаблона.
 *  @param {any} data - массивы и объекты шаблона сообщений
 *  @param {Map} mapState - коллекция переменных и их значений
 *  @returns {string} - Сгенерированнаый текст
 */
export const messageGenerator = (data: any, mapState: any): string => {
  let textGeneration = "";
  let condition: boolean[] = [];
  let index = -1;
  let isEndArray = false;

  if (data.children) {
    generator(data, data.type);
  } else if (data.text?.value !== "") {
    textGeneration = getValue(data.text?.value, mapState);
  }

  /**
   * Рекурсивная функция, перебирающая все вложенные массивы и объекты,
   * для генерации текста сообщения с учетом заданных в шаблоне условий и
   * сохраняющая во внешней переменной textGeneration накопительный результат
   * значений, полученных строк.
   *  @param {any} data - массивы и объекты шаблона сообщений
   *  @param {string} type - Тип элемента (например: "TEXT","IF","THEN","ELSE")
   */
  function generator(data: any, type: string) {
    if (isEndArray) {
      condition.pop();
      if (index >= 0) index--;
    }

    if (Array.isArray(data)) {
      isEndArray = false;

      for (let i = 0; i < data.length; i++) {
        if (i === data.length - 1) isEndArray = true;

        if (Array.isArray(data[i]?.children)) {
          generator(data[i].children, data[i].type);
        } else if (typeof data[i] === "object") {
          let str = "";
          if (
            (index === -1 && type !== "THEN") ||
            ((condition[index - 1] ||
              typeof condition[index - 1] === "undefined") &&
              (condition[index] || type === "TEXT")) ||
            (condition[index - 1] && !condition[index])
          ) {
            switch (data[i].type) {
              case "TEXT":
                str = getValue(data[i].text.value, mapState);
                textGeneration += str.trim() !== "" ? str : "";

                break;

              case "IF":
                str = data[i].text.value;
                while (str.includes("{")) {
                  const posStart = str.indexOf("{");
                  const posEnd = str.indexOf("}");
                  const variable = copy(str, posStart, posEnd);
                  const mapValue = mapState.get(variable);

                  if (mapValue) {
                    str = str.replace(`{${variable}}`, `${mapValue}`);
                    condition.push(true);
                  } else {
                    str = cut(str, posStart, posEnd);
                    condition.push(false);
                  }
                }
                index++;

                break;

              case "THEN":
                if (condition[index] === true) {
                  str = getValue(data[i].text.value, mapState);
                  textGeneration += str.trim() !== "" ? str : "";
                }

                break;

              case "ELSE":
                if (condition[index] !== true) {
                  str = getValue(data[i].text.value, mapState);
                  textGeneration += str.trim() !== "" ? str : "";
                }

                break;

              default:
                break;
            }
          }
        }
        if (i === data.length - 1) {
          condition.pop();
          index--;
        }
      }
    } else if (Array.isArray(data?.children)) {
      generator(data.children, data.type);
    }
  }

  return textGeneration;
};

/**
 * Функция которая вырезает из строки подстроку по заданным параметрам
 * и возвращает строку.
 * Применяется в функции generator, которая вложена в функцию messageGenerator.
 *  @param {string} str - Строка
 *  @param {number} cutStart - Начальный индекс строки
 *  @param {number} cutEnd - Конечный индекс строки
 *  @returns {string} - Подстрока (результат вырезки)
 */
function cut(str: string, cutStart: number, cutEnd: number): string {
  return str.substring(0, cutStart) + str.substring(cutEnd + 1);
}

/**
 * Функция которая копирует из строки подстроку по заданным параметрам
 * и возвращает подстроку
 * Применяется в функции generator, которая вложена в функцию messageGenerator.
 *  @param {string} str - Строка
 *  @param {number} cutStart - Начальный индекс строки
 *  @param {number} cutEnd - Конечный индекс строки
 *  @returns {string} - Подстрока (результат вырезки)
 */
function copy(str: string, cutStart: number, cutEnd: number): string {
  return str.substring(cutStart + 1, cutEnd);
}

/**
 * Функция перебором в цикле извлекает и возвращает текст со значениями
 * переменных, заключеных в фигурные скобки с проверкой наличия их
 * в коллекции mapState.
 * Применяется в функции generator, которая вложена в функцию messageGenerator.
 *  @param {string} str - Строка
 *  @param {Map} mapState - коллекция переменных и их значений
 *  @returns {string} - Строка (результат извлечения)
 */
function getValue(
  str: string,
  mapState: { get: (arg0: string) => any }
): string {
  if (str !== "") {
    while (str?.includes("{")) {
      const posStart = str.indexOf("{");
      const posEnd = str.indexOf("}");
      const variable = copy(str, posStart, posEnd);
      const mapValue = mapState.get(variable);
      if (mapValue) {
        str = str.replace(`{${variable}}`, `${mapValue}`);
      } else {
        str = cut(str, posStart, posEnd);
      }
    }
  }
  return str;
}
