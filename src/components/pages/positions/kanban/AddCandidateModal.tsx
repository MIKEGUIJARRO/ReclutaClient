import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { useKanban } from '../../../../hooks/useKanban';
import { ReclutaAPI } from '../../../../services/reclutaAPI';
import { GlobalModalContent } from '../../../ui/GlobalModal';

interface AddCandidateModal extends GlobalModalContent {
  stage: string;
  positionId: string;
}

interface CheckedCandidate {
  id: string;
  candidateId: string;
  checked: boolean;
}

interface CheckedCandidatesState {
  isAnySelected: boolean[];
  checkedCandidates: CheckedCandidate[];
}

export const AddCandidateModal: FC<AddCandidateModal> = ({
  hideModal,
  showModal,
  stage,
  positionId,
}) => {
  const kanbanContext = useKanban();
  const [checkedCandidates, setCheckedCandidates] =
    useState<CheckedCandidatesState>({
      isAnySelected: [],
      checkedCandidates: [],
    });

  const reclutaAPI = new ReclutaAPI();
  const { data, isLoading, error } = useQuery([`candidates`], async () => {
    const response = await reclutaAPI.candidates('findAll', {
      params: {
        positionIdNot: positionId,
      },
    });
    return response;
  });

  const mutationFn = async (body: Object) => {
    const reclutaAPI = new ReclutaAPI();
    const response = await reclutaAPI.candidatesStatus('bulkCreate', {
      body: body,
    });
    return response;
  };

  useEffect(() => {
    if (data && data.data) {
      const candidates: CheckedCandidate[] = data.data.map(
        (item: any, index: number) => ({
          id: index,
          checked: false,
          candidateId: item.id,
        })
      );
      setCheckedCandidates({
        isAnySelected: [],
        checkedCandidates: candidates,
      });
    }
  }, [data]);

  const {
    isSuccess: isSuccessCreateCandidateStatus,
    data: dataCreateCandidateStatus,
    mutate: createCandidateStatus,
  } = useMutation([], mutationFn);

  const addCandidateHandler = async () => {
    if (checkedCandidates.isAnySelected.length > 0) {
      const data: {}[] = [];
      checkedCandidates.checkedCandidates.forEach((checkedCandidate) => {
        if (checkedCandidate.checked) {
          data.push({
            comments: '',
            stage: stage,
            positionId: positionId,
            candidateId: checkedCandidate.candidateId,
          });
        }
      });
      const body = {
        data: data,
      };
      await createCandidateStatus(body);
    }
  };

  useEffect(() => {
    if (isSuccessCreateCandidateStatus && dataCreateCandidateStatus?.success) {
      kanbanContext?.reloadData(async () => {
        const response = await reclutaAPI.kanbanPosition('findOne', {
          id: positionId,
        });
        return response?.data.kanbanData;
      });
      hideModal();
    }
  }, [isSuccessCreateCandidateStatus]);

  return (
    <div className="prose">
      <h2 className="">{stage}</h2>
      <div className="overflow-auto max-h-96">
        <div className="form-control">
          {data &&
            data.data.map((candidates: any, index: number) => (
              <label className="label cursor-pointer">
                <span className="text-base font-semibold">
                  {candidates.firstName +
                    ' ' +
                    candidates.middleName +
                    ' ' +
                    candidates.lastName}
                </span>
                <input
                  onClick={() =>
                    setCheckedCandidates((prevState) => {
                      if (!prevState.checkedCandidates[index].checked) {
                        prevState.checkedCandidates[index].checked = true;
                        prevState.isAnySelected.push(true);
                      } else {
                        prevState.checkedCandidates[index].checked = false;
                        prevState.isAnySelected.pop();
                      }

                      return { ...prevState };
                    })
                  }
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
              </label>
            ))}
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          className="btn btn-primary"
          onClick={addCandidateHandler}
          disabled={checkedCandidates.isAnySelected.length === 0}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};
