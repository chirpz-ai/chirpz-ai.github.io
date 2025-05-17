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
import DoneIcon from "@mui/icons-material/Done";
import { transcode } from "buffer";

// React components for rendering nodes
const CustomNode = ({ node }: { node: Node }) => {
  const { label, icon, isActive, isReport } = node.getData() || {};
  return (
    <div className={`custom-node ${isActive ? 'active' : ''} ${isReport ? 'report-node' : ''}`}>
      <div className="custom-node-content">
        <div className="custom-node-icon-wrapper">
          {icon}
        </div>
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
    const initGraph = () => {
      if (!containerRef.current) return;
      
      // Clean up existing graph if it exists
      if (graphRef.current) {
        graphRef.current.dispose();
        graphRef.current = null;
      }
      
      // Initialize X6 Graph
      const graph = new Graph({
        container: containerRef.current,
        width: containerRef.current.offsetWidth,
        height: window.innerWidth < 768 ? 340 : 460,
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
          min: 0.3, // Allow scaling down further for mobile
          max: 2,
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.3, // Allow scaling down further for mobile
          maxScale: 2,
        },
        panning: {
          enabled: true,
          modifiers: 'shift',
        },
        interacting: {
          nodeMovable: false, 
        },
      });

      // Define a consistent vertical spacing
      const verticalSpacing = 260;
      const horizontalSpacing = 190;
      
      // Create Tools Container Group
      const toolsContainer = graph.addNode({
        id: 'tools-container',
        x: 170,
        y: 60,
        width: 680,
        height: 130,
        zIndex: -1,
        attrs: {
          body: {
            fill: 'rgba(30, 58, 138, 0.15)',
            stroke: 'rgba(96, 165, 250, 0.4)',
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

      // Create Processing Container Group 
      const processingContainer = graph.addNode({
        id: 'processing-container',
        x: 230,
        y: verticalSpacing - 50,
          width: 780,
          height: 260,
        zIndex: -2,
        attrs: {
          body: {
            fill: 'rgba(99, 102, 241, 0.08)',
            stroke: 'rgba(99, 102, 241, 0.3)',
            strokeWidth: 1,
            rx: 16,
            ry: 16,
          },
          label: {
            text: 'Processing Pipeline',
            fill: '#818CF8',
            fontSize: 14,
            fontWeight: 600,
            refX: 20,
            refY: 20,
            textAnchor: 'start',
          }
        },
      });

      // Add Tool Nodes
      const toolNodes = [
        {
          id: 'arize',
          position: { x: 200, y: 80 },
          data: { label: 'Arize', icon: <SsidChartIcon style={{ color: "#60A5FA", fontSize: 18 }} /> }
        },
        {
          id: 'watsonx',
          position: { x: 360, y: 80 },
          data: { label: 'Watsonx', icon: <AutoAwesomeIcon style={{ color: "#8B5CF6", fontSize: 18 }} /> }
        },
        {
          id: 'aws',
          position: { x: 520, y: 80 },
          data: { label: 'AWS SageMaker', icon: <CloudIcon style={{ color: "#F87171", fontSize: 18 }} /> }
        },
        {
          id: 'openlayer',
          position: { x: 680, y: 80 },
          data: { label: 'Openlayer', icon: <LanguageIcon style={{ color: "#EC4899", fontSize: 18 }} /> }
        },
        {
          id: 'dashboards',
          position: { x: 200, y: 135 },
          data: { label: 'Internal Dashboards', icon: <BarChartIcon style={{ color: "#38BDF8", fontSize: 18 }} /> }
        },
        {
          id: 'mongodb',
          position: { x: 360, y: 135 },
          data: { label: 'MongoDB', icon: <StorageIcon style={{ color: "#818CF8", fontSize: 18 }} /> }
        },
        {
          id: 'notion',
          position: { x: 520, y: 135 },
          data: { label: 'Notion', icon: <DescriptionIcon style={{ color: "#10B981", fontSize: 18 }} /> }
        },
        {
          id: 'kb',
          position: { x: 680, y: 135 },
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

      // Create Reflection Container Group - positioned at level 2
      const reflectionContainer = graph.addNode({
        id: 'reflection-container',
        x: 595,
        y: verticalSpacing + 80,
        width: 400, 
        height: 115,
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
            refY: 15,
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
      const level2Nodes = [
        {
          id: 'reflect',
          shape: 'reflection-node',
          x: 50 + horizontalSpacing * 4,  // Under Generate Response
          y: verticalSpacing + 110,
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
          y: verticalSpacing + 110,
          data: {
            label: 'Reflected Response',
            icon: <ForumIcon style={{ color: "#60A5FA", fontSize: 24 }} />,
            isActive: false,
          },
        },
        {
          id: 'report',
          shape: 'custom-node',
          x: 50,
          y: verticalSpacing + 110,
          data: {
            label: 'Generated Report',
            icon: <AssessmentIcon style={{ color: "#F59E0B", fontSize: 24 }} />,
            isActive: false,
            isReport: true,
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

      // Apply zoom for mobile view only
      if (window.innerWidth < 480) {
        graph.scale(0.35); // Very small screens (phones)
        graph.centerContent();
      } else if (window.innerWidth < 768) {
        graph.scale(0.45); // Medium screens (larger phones, small tablets)
        graph.centerContent();
      } else {
        // Just center content for desktop
        graph.centerContent();
      }
      
      // Save graph reference
      graphRef.current = graph;
      
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
    };
    
    // Initialize graph
    initGraph();
    
    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initGraph(); // Completely reinitialize graph on resize
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
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
          
          // Apply animation to the active node
          const nodeView = graphRef.current?.findViewByCell(node);
          if (nodeView) {
            const nodeElement = nodeView.findOne('rect');
            if (nodeElement) {
              if (id === activeNodeId) {
                // Dynamically import GSAP for node animations
                import('gsap').then(({ default: gsap }) => {
                  // Clear any existing animations
                  gsap.killTweensOf(nodeElement);
                  
                  // Create glow effect animation for active node
                  gsap.to(nodeElement, {
                    stroke: id.includes('reflect') ? 'rgba(16, 185, 129, 0.8)' : 'rgba(96, 165, 250, 0.8)',
                    strokeWidth: 2,
                    duration: 0.3
                  });
                  
                  // Create pulsing animation
                  gsap.fromTo(nodeElement, 
                    { boxShadow: '0 0 0 0 rgba(96, 165, 250, 0)' },
                    { 
                      boxShadow: id.includes('reflect') ? 
                        '0 0 15px 3px rgba(16, 185, 129, 0.7)' : 
                        '0 0 15px 3px rgba(96, 165, 250, 0.7)',
                      duration: 0.8,
                      repeat: -1,
                      yoyo: true,
                      ease: "power2.inOut"
                    }
                  );
                });
              } else {
                // Reset non-active nodes
                import('gsap').then(({ default: gsap }) => {
                  gsap.killTweensOf(nodeElement);
                  gsap.to(nodeElement, {
                    stroke: id.includes('reflect') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(96, 165, 250, 0.3)',
                    strokeWidth: 1,
                    boxShadow: 'none',
                    duration: 0.3
                  });
                });
              }
            }
          }
        }
      });

      // Apply animation to the edges connecting active node
      const currentIndex = workflowNodeIds.indexOf(activeNodeId);
      graphRef.current.getEdges().forEach(edge => {
        const source = edge.getSourceCellId();
        const target = edge.getTargetCellId();
        const edgeView = graphRef.current?.findViewByCell(edge);
        
        if (edgeView) {
          const pathElement = edgeView.findOne('path');
          if (pathElement) {
            // Check if this edge is part of the active flow
            const isActiveEdge = 
              (source === activeNodeId && workflowNodeIds.includes(target)) ||
              (target === activeNodeId && workflowNodeIds.includes(source)) ||
              (currentIndex > 0 && source === workflowNodeIds[currentIndex-1] && target === activeNodeId) ||
              (currentIndex < workflowNodeIds.length-1 && source === activeNodeId && target === workflowNodeIds[currentIndex+1]) ||
              (activeNodeId === 'generate' && source === 'generate' && target === 'reflect') ||
              (activeNodeId === 'reflect' && source === 'reflect' && target === 'reflected') ||
              (activeNodeId === 'reflected' && source === 'reflected' && target === 'report') ||
              // Include tool-call to tools-container edges
              (activeNodeId === 'tool-call' && 
                ((source === 'tool-call' && target === 'tools-container') || 
                 (source === 'tools-container' && target === 'tool-call')));
            
            // Apply GSAP animation based on edge status
            import('gsap').then(({ default: gsap }) => {
              // Clear any existing animations
              gsap.killTweensOf(pathElement);
              
              if (isActiveEdge) {
                // Enhanced active edge animation
                gsap.set(pathElement, {
                  stroke: '#60A5FA',
                  strokeWidth: 3
                });
                
                // Create a flowing animation along the path
                gsap.fromTo(pathElement, 
                  { strokeDasharray: '5 15', strokeDashoffset: 20 },
                  { 
                    strokeDashoffset: 0,
                    duration: 1.5, 
                    repeat: -1,
                    ease: "none"
                  }
                );
                
                // Add subtle glow effect
                gsap.to(pathElement, {
                  filter: 'drop-shadow(0 0 3px rgba(96, 165, 250, 0.8))',
                  duration: 0.5
                });
              } else {
                // Reset non-active edges
                gsap.to(pathElement, {
                  stroke: '#60A5FA',
                  strokeWidth: 2,
                  strokeDasharray: 'none',
                  strokeDashoffset: 0,
                  filter: 'none',
                  duration: 0.5
                });
              }
            });
          }
        }
      });

      // Special handling for the report node when active
      if (activeNodeId === 'report') {
        const reportNode = graphRef.current?.getCellById('report');
        if (reportNode) {
          const nodeView = graphRef.current?.findViewByCell(reportNode);
          if (nodeView) {
            const nodeElement = nodeView.findOne('rect');
            if (nodeElement) {
              import('gsap').then(({ default: gsap }) => {
                // Apply special report node glow with a different color
                gsap.to(nodeElement, {
                  stroke: 'rgba(16, 185, 129, 0.8)', // Green glow
                  strokeWidth: 2,
                  duration: 0.3
                });
                
                // Create more pronounced success glow effect
                gsap.fromTo(nodeElement, 
                  { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' },
                  { 
                    boxShadow: '0 0 20px 5px rgba(16, 185, 129, 0.7)',
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut"
                  }
                );
              });
            }
          }
        }
      }
    }
  }, [activeNodeId, workflowNodeIds]);

  // Auto advance through workflow steps
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (workflowRunning) {
      interval = setInterval(() => {
        const currentIndex = workflowNodeIds.indexOf(activeNodeId);
        let nextNodeId;
        
        // Special case: after tool-call, visit tools-container before proceeding to results
        if (activeNodeId === 'tool-call') {
          nextNodeId = 'tools-container';
        } 
        // Special case: after tools-container, move to results
        else if (activeNodeId === 'tools-container') {
          nextNodeId = 'results';
        } 
        // Default case: follow the standard workflow
        else {
          const nextIndex = (currentIndex + 1) % workflowNodeIds.length;
          nextNodeId = workflowNodeIds[nextIndex];
          
          // Reset on complete cycle
          if (nextIndex === 0) {
            if (interval) clearInterval(interval);
            setTimeout(() => setWorkflowRunning(true), 2000);
          }
        }
        
        setActiveNodeId(nextNodeId);
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
        py: { xs: 1, sm: 3, md: 8 },
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
              mb: { xs: 1, sm: 2, md: 4 } 
            }}
          >
            <Chip
              label="How it Works"
              sx={{
                mb: { xs: 1, sm: 2 },
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
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                fontWeight: 700,
                mb: { xs: 1, sm: 2 },
                color: "white",
              }}
            >
              Our Agentic Workflow
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
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
              background: "transparent",
              borderRadius: "16px",
              border: "none",
              boxShadow: "none",
              overflow: "hidden",
              mt: { xs: 1, sm: 2, md: 3 }
            }}
          >
            {/* X6 Graph Container */}
            <Box 
              ref={containerRef}
              sx={{ 
                height: { xs: 340, sm: 450, md: 650 }, 
                width: '100%',
                overflow: 'hidden'
              }}
            />

            {/* Custom CSS for the diagram */}
            <style jsx global>{`
              .custom-node {
                background-color: #1e2330;
                border-radius: 8px;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 10px 15px;
                border: 1px solid rgba(96, 165, 250, 0.3);
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                overflow: hidden;
              }
              
              .custom-node.active {
                box-shadow: 0 0 25px rgba(96, 165, 250, 0.5);
                border: 1px solid rgba(96, 165, 250, 0.8);
              }
              
              .custom-node.report-node {
                background-color: rgba(16, 185, 129, 0.08);
                border: 1px solid rgba(16, 185, 129, 0.3);
              }
              
              .custom-node.report-node.active {
                box-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
                border: 1px solid rgba(16, 185, 129, 0.8);
                background-color: rgba(16, 185, 129, 0.15);
              }
              
              .custom-node-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                overflow: hidden;
              }
              
              .custom-node-icon-wrapper {
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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
              }
              
              .tool-node {
                background-color: rgba(96, 165, 250, 0.15);
                border: 1px solid rgba(96, 165, 250, 0.3);
                border-radius: 8px;
                display: flex;
                align-items: center;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
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
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 10px 15px;
                border: 1px solid rgba(96, 165, 250, 0.3);
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                overflow: hidden;
              }
              
              .reflection-node.active {
                box-shadow: 0 0 25px rgba(16, 185, 129, 0.5);
                border: 1px solid rgba(16, 185, 129, 0.8);
              }
              
              .reflection-node-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                overflow: hidden;
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
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
              }
            `}</style>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
} 