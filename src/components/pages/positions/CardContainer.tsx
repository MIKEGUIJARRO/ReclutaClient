import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CardPosition } from './CardPosition';

export const CardContainer = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="row-span-1 col-span-1 col-start-1">
        <Link
          to={'/home/positions/create'}
          className="btn btn-primary gap-2 btn-block"
        >
          <FiPlusCircle size={24} /> Agregar Posiciones
        </Link>
      </div>
      <div className="col-start-1">
        <CardPosition
          key={24}
          id="24"
          title="1 Desarrollador Frontend"
          description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            tristique velit. Sed faucibus auctor molestie. Curabitur elementum
            lectus aliquet, volutpat enim quis, placerat dolor. In eleifend
            neque id molestie sagittis."
          candidates={24}
          createdAt="1d"
        />
      </div>
      <CardPosition
        key={24}
        id="24"
        title="2 Desarrollador Frontend"
        description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            tristique velit. Sed faucibus auctor molestie. Curabitur elementum
            lectus aliquet, volutpat enim quis, placerat dolor. In eleifend
            neque id molestie sagittis."
        candidates={24}
        createdAt="1d"
      />
      <CardPosition
        key={24}
        id="24"
        title="3 Desarrollador Frontend"
        description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            tristique velit. Sed faucibus auctor molestie. Curabitur elementum
            lectus aliquet, volutpat enim quis, placerat dolor. In eleifend
            neque id molestie sagittis."
        candidates={24}
        createdAt="1d"
      />
      <CardPosition
        key={24}
        id="24"
        title="3 Desarrollador Frontend"
        description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            tristique velit. Sed faucibus auctor molestie. Curabitur elementum
            lectus aliquet, volutpat enim quis, placerat dolor. In eleifend
            neque id molestie sagittis."
        candidates={24}
        createdAt="1d"
      />
      <CardPosition
        key={24}
        id="24"
        title="3 Desarrollador Frontend"
        description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            tristique velit. Sed faucibus auctor molestie. Curabitur elementum
            lectus aliquet, volutpat enim quis, placerat dolor. In eleifend
            neque id molestie sagittis."
        candidates={24}
        createdAt="1d"
      />
      <CardPosition
        key={24}
        id="24"
        title="3 Desarrollador Frontend"
        description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            tristique velit. Sed faucibus auctor molestie. Curabitur elementum
            lectus aliquet, volutpat enim quis, placerat dolor. In eleifend
            neque id molestie sagittis."
        candidates={24}
        createdAt="1d"
      />
      <CardPosition
        key={24}
        id="24"
        title="3 Desarrollador Frontend"
        description=" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            tristique velit. Sed faucibus auctor molestie. Curabitur elementum
            lectus aliquet, volutpat enim quis, placerat dolor. In eleifend
            neque id molestie sagittis."
        candidates={24}
        createdAt="1d"
      />
    </div>
  );
};
