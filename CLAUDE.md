# SwarmThing Configuration

## MCP Server

SwarmThing provides an MCP server for Claude Code integration.

### Setup
```bash
claude mcp add swarmthing -- swarmthing mcp
```

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `swarm_init` | Initialize swarm with topology and team preset |
| `swarm_status` | Get current swarm status |
| `swarm_shutdown` | Gracefully shutdown the swarm |
| `agent_spawn` | Spawn a new agent |
| `agent_list` | List all agents |
| `agent_status` | Get specific agent status |
| `agent_terminate` | Terminate an agent |
| `team_list` | List available team presets |
| `team_apply` | Apply a team preset |
| `task_create` | Create and submit a task |
| `task_status` | Get task status |

## Team Presets

### Software Engineering (recommended for code tasks)
- **Topology**: hierarchical
- **Agents**: Coordinator (Tech Lead), Architect, 2x Coder, Reviewer, Tester

### Leadership (strategic decisions)
- **Topology**: star
- **Agents**: CEO, CTO, CPO, CSO, CFO

### Product Management (product work)
- **Topology**: mesh
- **Agents**: Product Lead, Designer, User Researcher, Data Analyst

## Quick Start

1. Initialize with software engineering team:
```
Use MCP tool: swarm_init
  topology: "hierarchical"
  team: "software_engineering"
```

2. Submit a task:
```
Use MCP tool: task_create
  title: "Implement feature X"
  description: "Details..."
  priority: "high"
```

3. Check status:
```
Use MCP tool: swarm_status
```

## CLI Commands

```bash
# Initialize swarm
swarmthing swarm init --topology hierarchical --team software_engineering

# Launch TUI
swarmthing tui

# List teams
swarmthing team list

# Check status
swarmthing status
```

## Custom Teams

Add YAML files to `.claude/teams/` or `internal/config/teams/`:

```yaml
name: "My Custom Team"
preset: custom
topology: mesh
coordinator: lead
agents:
  - id: lead
    type: coordinator
    name: "Team Lead"
    model: opus
    capabilities:
      - task_planning
      - delegation
  - id: dev1
    type: coder
    name: "Developer"
    model: sonnet
    capabilities:
      - code_writing
      - debugging
```
