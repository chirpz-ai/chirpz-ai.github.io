"use client";

import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { Graph, Node, Edge, Shape, Path, Cell } from "@antv/x6";
import { register } from "@antv/x6-react-shape";
import {
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  Chip,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

// Icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import BuildIcon from "@mui/icons-material/Build";
import BarChartIcon from "@mui/icons-material/BarChart";
import DataObjectIcon from "@mui/icons-material/DataObject";
import CachedIcon from "@mui/icons-material/Cached";
import ForumIcon from "@mui/icons-material/Forum";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import CloudIcon from "@mui/icons-material/Cloud";
import StorageIcon from "@mui/icons-material/Storage";
import LanguageIcon from "@mui/icons-material/Language";

// React components for rendering nodes
const CustomNode = ({ node }: { node: Node }) => {
  const { label, icon, isActive } = node.getData() || {};
  return (
    <div className={`custom-node ${isActive ? 'active' : ''}`}>
      <div className="custom-node-content">
        <div className="custom-node-icon">{icon}</div>
        <div className="custom-node-label">{label}</div>
      </div>
    </div>
  );
};

const ToolNode = ({ node }: { node: Node }) => {
  const { label, icon } = node.getData() || {};
  return (
    <div className="tool-node">
      <div className="tool-node-icon">{icon}</div>
      <div className="tool-node-label">{label}</div>
    </div>
  );
};

const ReflectionNode = ({ node }: { node: Node }) => {
  const { label, icon, isActive } = node.getData() || {};
  return (
    <div className={`reflection-node ${isActive ? 'active' : ''}`}>
      <div className="reflection-node-content">
        <div className="reflection-node-icon">{icon}</div>
        <div className="reflection-node-label">{label}</div>
      </div>
    </div>
  );
};

// Register custom React node components
register({
  shape: 'custom-node',
  width: 160,
  height: 70,
  component: CustomNode,
});

register({
  shape: 'tool-node',
  width: 140,
  height: 40,
  component: ToolNode,
});

register({
  shape: 'reflection-node',
  width: 160,
  height: 70,
  component: ReflectionNode,
});

export function Workflow() {
  const theme = useTheme();
  const [activeNodeId, setActiveNodeId] = useState("request");
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  const workflowNodeIds = useMemo(() => [
    'request', 'agent', 'tool-call', 'results', 'generate', 'reflect', 'reflected', 'report'
  ], []);

  // Initialize the graph when component mounts
  useEffect(() => {
    if (containerRef.current && !graphRef.current) {
      // Initialize X6 Graph
      const graph = new Graph({
        container: containerRef.current,
        width: containerRef.current.offsetWidth,
        height: 490,
        background: {
          color: 'transparent',
        },
        grid: {
          visible: false,
        },
        connecting: {
          router: {
            name: 'manhattan',
            args: {
              padding: 20,
            },
          },
          connector: {
            name: 'rounded',
            args: {
              radius: 8,
            },
          },
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          snap: {
            radius: 20,
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#60A5FA',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8,
                  },
                },
              },
              zIndex: 0,
            });
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#5F95FF',
                stroke: '#5F95FF',
              },
            },
          },
        },
        scaling: {
          min: 0.5,
          max: 2,
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.5,
          maxScale: 2,
        },
        panning: {
          enabled: true,
          modifiers: 'shift',
        },
      });

      // Create Tools Container Group
      const toolsContainer = graph.addNode({
        id: 'tools-container',
        x: 160,
        y: 80,
        width: 700,
        height: 170,
        zIndex: -1,
        attrs: {
          body: {
            fill: '#171923',
            stroke: 'rgba(55, 65, 81, 0.5)',
            strokeWidth: 1,
            rx: 12,
            ry: 12,
          },
        },
        ports: {
          groups: {
            bottom: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
          },
          items: [
            { id: 'port-bottom', group: 'bottom' },
          ],
        },
      });

      // Add Tool Nodes
      const toolNodes = [
        {
          id: 'arize',
          position: { x: 190, y: 110 },
          data: { label: 'Arize', icon: <SsidChartIcon style={{ color: "#60A5FA", fontSize: 18 }} /> }
        },
        {
          id: 'watsonx',
          position: { x: 350, y: 110 },
          data: { label: 'Watsonx', icon: <AutoAwesomeIcon style={{ color: "#8B5CF6", fontSize: 18 }} /> }
        },
        {
          id: 'aws',
          position: { x: 510, y: 110 },
          data: { label: 'AWS SageMaker', icon: <CloudIcon style={{ color: "#F87171", fontSize: 18 }} /> }
        },
        {
          id: 'openlayer',
          position: { x: 670, y: 110 },
          data: { label: 'Openlayer', icon: <LanguageIcon style={{ color: "#EC4899", fontSize: 18 }} /> }
        },
        {
          id: 'dashboards',
          position: { x: 190, y: 180 },
          data: { label: 'Internal Dashboards', icon: <BarChartIcon style={{ color: "#38BDF8", fontSize: 18 }} /> }
        },
        {
          id: 'mongodb',
          position: { x: 350, y: 180 },
          data: { label: 'MongoDB', icon: <StorageIcon style={{ color: "#818CF8", fontSize: 18 }} /> }
        },
        {
          id: 'notion',
          position: { x: 510, y: 180 },
          data: { label: 'Notion', icon: <DescriptionIcon style={{ color: "#10B981", fontSize: 18 }} /> }
        },
        {
          id: 'kb',
          position: { x: 670, y: 180 },
          data: { label: 'Knowledge Base', icon: <ArticleIcon style={{ color: "#F59E0B", fontSize: 18 }} /> }
        },
      ];

      toolNodes.forEach(toolNode => {
        graph.addNode({
          id: toolNode.id,
          shape: 'tool-node',
          x: toolNode.position.x,
          y: toolNode.position.y,
          data: {
            label: toolNode.data.label,
            icon: toolNode.data.icon,
          },
          ports: {
            groups: {
              bottom: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
          },
        });
      });

      // Define a consistent vertical spacing
      const verticalSpacing = 290;
      const horizontalSpacing = 190;
      
      // Create Reflection Container Group - positioned at level 2
      const reflectionContainer = graph.addNode({
        id: 'reflection-container',
        x: 595,
        y: verticalSpacing + 95,
        width: 400, 
        height: 130,
        zIndex: -1,
        attrs: {
          body: {
            fill: 'rgba(16, 185, 129, 0.1)',
            stroke: 'rgba(16, 185, 129, 0.3)',
            strokeWidth: 1,
            strokeDasharray: '5 5',
            rx: 12,
            ry: 12,
          },
          label: {
            text: 'Reflection',
            fill: '#10B981',
            fontSize: 14,
            fontWeight: 600,
            refX: 0.5,
            refY: 20,
            textAnchor: 'middle',
          }
        },
      });

      // Main workflow nodes - level 1
      const mainNodes = [
        {
          id: 'request',
          shape: 'custom-node',
          x: 50,
          y: verticalSpacing,
          data: {
            label: 'Report Request',
            icon: <PersonOutlineIcon style={{ color: "#60A5FA", fontSize: 24 }} />,
            isActive: true,
          }
        },
        {
          id: 'agent',
          shape: 'custom-node',
          x: 50 + horizontalSpacing,
          y: verticalSpacing,
          data: {
            label: 'Agent',
            icon: <SmartToyOutlinedIcon style={{ color: "#10B981", fontSize: 24 }} />,
            isActive: false,
          }
        },
        {
          id: 'tool-call',
          shape: 'custom-node',
          x: 50 + horizontalSpacing * 2,
          y: verticalSpacing,
          data: {
            label: 'Tool Call',
            icon: <BuildIcon style={{ color: "#8B5CF6", fontSize: 24 }} />,
            isActive: false,
          }
        },
        {
          id: 'results',
          shape: 'custom-node',
          x: 50 + horizontalSpacing * 3, 
          y: verticalSpacing,
          data: {
            label: 'Results',
            icon: <BarChartIcon style={{ color: "#F59E0B", fontSize: 24 }} />,
            isActive: false,
          }
        },
        {
          id: 'generate',
          shape: 'custom-node',
          x: 50 + horizontalSpacing * 4,
          y: verticalSpacing,
          data: {
            label: 'Generate Response',
            icon: <DataObjectIcon style={{ color: "#60A5FA", fontSize: 24 }} />,
            isActive: false,
          }
        },
      ];

      // Add ports to enable better connections
      mainNodes.forEach(node => {
        graph.addNode({
          id: node.id,
          shape: node.shape,
          x: node.x,
          y: node.y,
          data: node.data,
          ports: {
            groups: {
              left: {
                position: 'left',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              right: {
                position: 'right',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              bottom: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              top: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              { id: 'port-left', group: 'left' },
              { id: 'port-right', group: 'right' },
              { id: 'port-bottom', group: 'bottom' },
              { id: 'port-top', group: 'top' },
            ],
          },
        });
      });

      // Reflection and report nodes from right to left - level 2
      // Reflect under Generate Response, Reflected Response under Results, Generated Report under Report Request
      const level2Nodes = [
        {
          id: 'reflect',
          shape: 'reflection-node',
          x: 50 + horizontalSpacing * 4,  // Under Generate Response
          y: verticalSpacing + 130,
          data: {
            label: 'Reflect',
            icon: <CachedIcon style={{ color: "#10B981", fontSize: 24 }} />,
            isActive: false,
          },
        },
        {
          id: 'reflected',
          shape: 'reflection-node',
          x: 50 + horizontalSpacing * 3,  // Under Results
          y: verticalSpacing + 130,
          data: {
            label: 'Reflected Response',
            icon: <ForumIcon style={{ color: "#60A5FA", fontSize: 24 }} />,
            isActive: false,
          },
        },
        {
          id: 'report',
          shape: 'custom-node',
          x: 50,  // Under Report Request
          y: verticalSpacing + 130,
          data: {
            label: 'Generated Report',
            icon: <AssessmentIcon style={{ color: "#F59E0B", fontSize: 24 }} />,
            isActive: false,
          },
        },
      ];

      // Add level 2 nodes with ports
      level2Nodes.forEach(node => {
        graph.addNode({
          id: node.id,
          shape: node.shape,
          x: node.x,
          y: node.y,
          data: node.data,
          ports: {
            groups: {
              left: {
                position: 'left',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              right: {
                position: 'right',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              top: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#5F95FF',
                    strokeWidth: 1,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              { id: 'port-left', group: 'left' },
              { id: 'port-right', group: 'right' },
              { id: 'port-top', group: 'top' },
            ],
          },
        });
      });

      // Create edges with specific source and target ports for better routing
      const edges = [
        // Main horizontal workflow
        { source: { cell: 'request', port: 'port-right' }, target: { cell: 'agent', port: 'port-left' } },
        { source: { cell: 'agent', port: 'port-right' }, target: { cell: 'tool-call', port: 'port-left' } },
        { source: { cell: 'tool-call', port: 'port-right' }, target: { cell: 'results', port: 'port-left' } },
        { source: { cell: 'results', port: 'port-right' }, target: { cell: 'generate', port: 'port-left' } },
        
        // Vertical connection from Generate to Reflect
        { source: { cell: 'generate', port: 'port-bottom' }, target: { cell: 'reflect', port: 'port-top' } },
        
        // Level 2 flow from right to left
        { source: { cell: 'reflect', port: 'port-left' }, target: { cell: 'reflected', port: 'port-right' } },
        { source: { cell: 'reflected', port: 'port-left' }, target: { cell: 'report', port: 'port-right' } },
      ];

      // Add main flow edges
      edges.forEach(edge => {
        graph.addEdge({
          source: edge.source,
          target: edge.target,
          attrs: {
            line: {
              stroke: '#60A5FA',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 10,
                height: 6,
              },
            },
          },
          router: {
            name: 'normal',
          },
          connector: {
            name: 'rounded',
            args: {
              radius: 8,
            },
          },
        });
      });

      // Simple vertical double-sided arrow between Tool Call and tools container
      // First arrow from tool-call to tools-container
      graph.addEdge({
        source: { cell: 'tool-call', port: 'port-top' },
        target: { cell: 'tools-container', port: 'port-bottom' },
        attrs: {
          line: {
            stroke: '#60A5FA',
            strokeWidth: 2,
            targetMarker: {
              name: 'block',
              width: 10,
              height: 6,
            },
          },
        },
        router: {
          name: 'normal',
        },
        connector: {
          name: 'normal',
        },
      });

      // Second arrow from tools-container to tool-call
      graph.addEdge({
        source: { cell: 'tools-container', port: 'port-bottom' },
        target: { cell: 'tool-call', port: 'port-top' },
        attrs: {
          line: {
            stroke: '#60A5FA',
            strokeWidth: 2,
            targetMarker: {
              name: 'block',
              width: 10,
              height: 6,
            },
          },
        },
        router: {
          name: 'normal',
        },
        connector: {
          name: 'normal',
        },
      });

      // Set up node click events
      graph.on('node:click', ({ node }) => {
        if (workflowNodeIds.includes(node.id as string)) {
          setActiveNodeId(node.id as string);
          setWorkflowRunning(false);
          
          // Resume after 5 seconds of inactivity
          setTimeout(() => {
            setWorkflowRunning(true);
          }, 5000);
        }
      });

      // Save graph reference
      graphRef.current = graph;

      // Center the graph to fit all content
      graph.centerContent();
    }

    // Clean up on unmount
    return () => {
      if (graphRef.current) {
        graphRef.current.dispose();
        graphRef.current = null;
      }
    };
  }, [workflowNodeIds]);

  // Update active node state
  useEffect(() => {
    if (graphRef.current) {
      workflowNodeIds.forEach(id => {
        const node = graphRef.current?.getCellById(id);
        if (node) {
          const currentData = node.getData() || {};
          node.setData({
            ...currentData,
            isActive: id === activeNodeId
          });
        }
      });
    }
  }, [activeNodeId, workflowNodeIds]);

  // Auto advance through workflow steps
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (workflowRunning) {
      interval = setInterval(() => {
        const currentIndex = workflowNodeIds.indexOf(activeNodeId);
        const nextIndex = (currentIndex + 1) % workflowNodeIds.length;
        
        if (nextIndex === 0) {
          if (interval) clearInterval(interval);
          setTimeout(() => setWorkflowRunning(true), 2000);
        }
        
        setActiveNodeId(workflowNodeIds[nextIndex]);
      }, 1500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workflowRunning, activeNodeId, workflowNodeIds]);

  // Start animation after component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setWorkflowRunning(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      id="workflow"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: "linear-gradient(135deg, #1F2937 0%, #111827 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/grid-pattern.svg')",
          backgroundRepeat: "repeat",
          opacity: 0.05,
          zIndex: 0,
        }}
      />

      {/* Gradient blur effect */}
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          right: "10%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 70%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              textAlign: "center", 
              maxWidth: "800px", 
              mx: "auto", 
              mb: { xs: 3, md: 4 } 
            }}
          >
            <Chip
              label="How it Works"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#60A5FA",
                bgcolor: alpha("#60A5FA", 0.15),
                py: 0.5,
                px: 1,
              }}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: 2,
                color: "white",
              }}
            >
              Our Agentic Workflow
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.125rem" },
                color: alpha("#fff", 0.8),
                maxWidth: "650px",
                mx: "auto",
              }}
            >
              Intelligent agents that seamlessly connect to your enterprise tools, extract key metrics, and transform them into comprehensive governance reports.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 0,
              backgroundColor: alpha("#111827", 0.6),
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              border: "1px solid rgba(75, 85, 99, 0.3)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
          >
            {/* X6 Graph Container */}
            <Box 
              ref={containerRef}
              sx={{ 
                height: 650, 
                width: '100%',
                overflow: 'hidden'
              }}
            />

            {/* Custom CSS for the diagram */}
            <style jsx global>{`
              .custom-node {
                background-color: #1e2330;
                border-radius: 8px;
                width: 160px;
                height: 70px;
                padding: 10px 15px;
                border: 1px solid rgba(96, 165, 250, 0.3);
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
              }
              
              .custom-node.active {
                box-shadow: 0 0 25px rgba(96, 165, 250, 0.5);
                border: 1px solid rgba(96, 165, 250, 0.8);
                transform: translateY(-2px) scale(1.03);
              }
              
              .custom-node-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
              }
              
              .custom-node-icon {
                margin-bottom: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .custom-node-label {
                font-size: 12px;
                font-weight: 500;
                color: white;
                text-align: center;
              }
              
              .tool-node {
                background-color: rgba(96, 165, 250, 0.15);
                border: 1px solid rgba(96, 165, 250, 0.3);
                border-radius: 8px;
                display: flex;
                align-items: center;
                width: 140px;
                height: 40px;
                padding: 8px 12px;
                gap: 8px;
                transition: all 0.3s ease;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              
              .tool-node:hover {
                background-color: rgba(96, 165, 250, 0.25);
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
              }
              
              .tool-node-icon {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .tool-node-label {
                font-size: 11px;
                font-weight: 500;
                color: white;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              
              .reflection-node {
                background-color: #1e2330;
                border-radius: 8px;
                width: 160px;
                height: 70px;
                padding: 10px 15px;
                border: 1px solid rgba(96, 165, 250, 0.3);
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
              }
              
              .reflection-node.active {
                box-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
                border: 1px solid rgba(16, 185, 129, 0.8);
                transform: translateY(-2px) scale(1.03);
              }
              
              .reflection-node-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
              }
              
              .reflection-node-icon {
                margin-bottom: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .reflection-node-label {
                font-size: 12px;
                font-weight: 500;
                color: white;
                text-align: center;
              }
            `}</style>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
} 