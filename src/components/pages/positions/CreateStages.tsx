import React, { FC, Dispatch, SetStateAction } from 'react';
import { FiCheckCircle, FiEdit, FiPlusCircle, FiXCircle } from 'react-icons/fi';

export interface PositionStage {
  name: string;
  isEditing: boolean;
}

export interface PositionStages extends Array<PositionStage> {}

interface CreateStages {
  stages: PositionStages;
  setStages: Dispatch<SetStateAction<PositionStages>>;
}

export const CreateStages: FC<CreateStages> = ({ stages, setStages }) => {
  const editStageHandler = (stageIndex: number) => {
    setStages((prevStages) =>
      prevStages.map((stage, index) => {
        if (index === stageIndex) {
          return { ...stage, isEditing: true };
        }
        return stage;
      })
    );
  };

  const confirmChangesHandler = (stageIndex: number) => {
    if (!isInputValid(stages[stageIndex].name)) {
      return;
    }
    setStages((prevStages) =>
      prevStages.map((stage, index) => {
        if (index === stageIndex) {
          return { ...stage, isEditing: false };
        }
        return stage;
      })
    );
  };

  const addStageHadler = () => {
    setStages((prevStages) => {
      const updatedStages = [...prevStages];
      updatedStages.push({ isEditing: true, name: '' });
      return updatedStages;
    });
  };

  const deleteStageHandler = (stageIndex: number) => {
    setStages((prevStages) => {
      const updatedStages = [...prevStages];
      updatedStages.splice(stageIndex, 1);
      console.log(updatedStages);
      return [...updatedStages];
    });
  };

  const isInputValid = (text: string) => {
    if (text.length === 0) {
      return false;
    }
    return true;
  };

  const stageInputeHandler = (stageIndex: number, value: string) => {
    setStages((prevStages) =>
      prevStages.map((stage, index) => {
        if (index === stageIndex) {
          return { ...stage, name: value };
        }
        return stage;
      })
    );
  };

  const stageItemsRendering = () => {
    return stages.map((stage, index) => (
      <li className="step font-semibold" key={index}>
        {stage.isEditing ? (
          <div className="flex w-full flex-row items-center justify-between gap-16">
            <input
              type="text"
              placeholder="Etapa del proceso"
              className="input input-bordered m-2 flex-1"
              value={stage.name}
              onChange={(e) => {
                e.preventDefault();
                stageInputeHandler(index, e.target.value);
              }}
            />
            <div className="flex justify-start items-center gap-2 ">
              <button className="btn btn-ghost btn-sm btn-square">
                <FiCheckCircle
                  size={24}
                  onClick={() => confirmChangesHandler(index)}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-row items-center justify-between gap-16">
            <div className="flex-1 overflow-hidden">
              <p className="px-4 m-2 text-start">{stage.name}</p>
            </div>
            <div className="flex justify-start items-center gap-2 ">
              <button
                className="btn btn-ghost btn-sm btn-square"
                onClick={() => editStageHandler(index)}
              >
                <FiEdit size={24} />
              </button>
              <button
                className="btn btn-ghost btn-sm btn-square"
                onClick={() => deleteStageHandler(index)}
              >
                <FiXCircle size={24} />
              </button>
            </div>
          </div>
        )}
      </li>
    ));
  };

  return (
    <div>
      <div className="flex flex-col justify-start items-start">
        <ul className="steps steps-vertical max-w-lg w-full overflow-visible">
          {stageItemsRendering()}
          <button className="btn btn-outline gap-2" onClick={addStageHadler}>
            <FiPlusCircle size={24} />
            Agregar etapa
          </button>
        </ul>
      </div>
    </div>
  );
};
