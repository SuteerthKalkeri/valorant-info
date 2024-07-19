import React, { useState, useEffect } from 'react';
import { getAgents } from '../apiService';
import '../css/HomePage.css';

const HomePage = () => {
  const [agentsByRole, setAgentsByRole] = useState({});
  const [selectedAgent, setSelectedAgent] = useState(null);
  const excludedUUID = 'ded3520f-4264-bfed-162d-b080e2abccf9';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentsResponse = await getAgents();
        const groupedAgents = agentsResponse.data.data.filter(agent => agent.uuid !== excludedUUID).reduce((acc, agent) => {
          const role = agent.role && agent.role.displayName ? agent.role.displayName : 'Unknown Role';
          if (!acc[role]) {
            acc[role] = [];
          }
          acc[role].push(agent);
          return acc;
        }, {});
        setAgentsByRole(groupedAgents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
    window.scrollTo(0, 0);
  };

  if (selectedAgent) {
    return (
      <div className="container">
        <div className="agent-details-large">
          <div className="agent-details-text">
            <div className="agent-name-large">{selectedAgent.displayName}</div>
            <div className="agent-description-large">{selectedAgent.description}</div>
            <div className="agent-role-container">
              <img
                src={selectedAgent.role.displayIcon}
                alt={selectedAgent.role.displayName}
                className="agent-role-icon"
              />
              <div>{selectedAgent.role.displayName}</div>
            </div>
            <div className="detail-box">
              <strong>Abilities:</strong>
              <ul>
                {selectedAgent.abilities.map((ability, index) => (
                  <li key={index} className="ability-item">
                    <img src={ability.displayIcon} alt={ability.displayName} />
                    <div><b>{ability.displayName}</b>: {ability.description}</div>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => setSelectedAgent(null)}>Back to all agents</button>
          </div>
          <div className="agent-photo-large">
          <img
             src={selectedAgent.fullPortrait}
            alt={selectedAgent.displayName}
          />
          </div>
          
        </div>
      </div>
    );
  }
  

  return (
    <div className="container">
      <h1>Agents</h1>
      {Object.keys(agentsByRole).map((role) => (
        <div key={role}>
          <h2 className="role-title">{role}</h2>
          <div className="agents-grid">
            {agentsByRole[role].map((agent) => (
              <div
                key={agent.uuid}
                className="agent-card"
                onClick={() => handleAgentClick(agent)}
              >
                <img
                  src={agent.bustPortrait}
                  alt={agent.displayName}
                  className="agent-thumbnail"
                />
                <p className="agent-name">{agent.displayName}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
