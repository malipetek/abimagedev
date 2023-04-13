import React, { useEffect, useState, Fragment, useCallback, useRef } from "react";
import {
  LegacyCard, Page, Layout, TextContainer, Heading, DropZone, Text, Checkbox,
  Columns,
  AlphaStack,
  AlphaCard,
  Box,
  SkeletonBodyText,
  SkeletonDisplayText,
  Bleed,
  Divider,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useAppQuery } from "../../hooks";
import { arrayMoveImmutable } from "array-move";
import "./module.css";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import { SortableList } from '../../components';

const PRODUCT_QUERY = `
query ($handle: String!){
  productByHandle(handle: $handle) {
    id
    title
    images (first:50) {
      edges {
        node {
          id
          url
          altText
          metafields(namespace: "abimage", first: 10) {
            edges {
              node {
                key
                value
              } 
            }
          }
        }
      }
    }
  }
}
`;

const moveImageOrderMutation = `
mutation productImageUpdate($id: ID!, $move: [MoveInput!]!) {
  productReorderMedia(id: $id, moves: $move) {
    job {
      done
    }
    mediaUserErrors {
      code
      message
    }
  }
}`;

const SkeletonLabel = (props) => {
  return (
    <Box
      background="surface-neutral"
      minHeight="1rem"
      maxWidth="5rem"
      borderRadius="base"
      {...props}
    />
  );
};

/******************
 * MAIN COMPONENT *
 ******************/
export default function PageName() {
  const navigate = useNavigate();
  const [offloadedImages, setOffloadedImages] = useState([]);
  const [product, setProduct] = useState(null);
  const [productImgs, setProductImgs] = useState([]);
  const [candidateImgs, setCandidateImgs] = useState([]);

  const params = useParams();
  const [sortActions, setSortActions] = useState([]);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const {
    data,
    refetch,
    isLoading,
    isRefetching
  } = useAppQuery({
    query: PRODUCT_QUERY,
    variables: { handle: params.product },
  });

  useEffect(() => {
    if (!isLoading) {
      const product = data.data.productByHandle;
      if (product) {
        setProduct(product);
        setProductImgs(product.images.edges.map(edge => edge.node));
      }

      console.log('product => ', product);
    }
  }, [isLoading, data]);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  return (
    <Page
      backAction={{
        onAction: () => navigate('/')
      }}
      title={"" + (product?.title || 'loading..') + " (" + params.product + ")"}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Columns columns={{ xs: 1, md: "2fr 1fr" }} gap="4">
        <AlphaStack gap="4">
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4">
              <div className="DropZone">
                <SortableList
                  items={productImgs}
                  onChange={setProductImgs}
                  renderItem={(image, index) => (
                    <SortableList.Item id={image.id} key={image.id} index={index}>
                      <Text variant="headingSm" as="p">
                        {(++index) + " - " + (image.altText || 'No alt text!')}
                      </Text>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        height: 'auto',
                        objectFit: 'cover'
                      }}>
                        <img className="image" src={image.url} alt={image.altText} />
                      </div>
                    </SortableList.Item>
                  )}
                />
              </div>
              <div className={`DropZone ${
                candidateImgs.length > 0 ? '' : 'empty'
              }`}>
                <SortableList
                  items={candidateImgs}
                  onChange={setCandidateImgs}
                  renderItem={(image, index) => (
                    <SortableList.Item id={image.id} key={image.id} index={index}>
                      <Text variant="headingSm" as="p">
                        {(++index) + " - " + (image.altText || 'No alt text!')}
                      </Text>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        height: 'auto',
                        objectFit: 'cover'
                      }}>
                        <img className="image" src={image.url} alt={image.altText} />
                      </div>
                    </SortableList.Item>
                  )}
                />
              </div>

              {/* <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
              >
                <SortableImageContainer
                  label={<Fragment><Heading > Active Product Images </Heading><TextContainer>Drag sort to change order </TextContainer></Fragment>}
                  axis="xy"
                  images={product?.images.edges.filter(
                    (image) => offloadedImages.indexOf(image.node.id) === -1
                  ) || []}
                  onSortEnd={({ oldIndex, newIndex }) => {

                    
                  }}
                />
                <SortableImageContainer
                  label={<Fragment><h3> Candidate Images </h3><p>Drag sort to change order </p></Fragment>}
                  axis="xy"
                  images={product?.images.edges.filter(
                    (image) => offloadedImages.indexOf(image.node.id) > -1
                  ) || []}
                  onSortEnd={({ oldIndex, newIndex }) => {
                    const newImages = arrayMoveImmutable(
                      product.images.edges.filter(
                        (image) =>
                          offloadedImages.indexOf(image.node.id) > -1
                      ),
                      oldIndex,
                      newIndex
                    );
                    setProduct({
                      ...product,
                      images: {
                        edges: [
                          ...newImages,
                        ],
                      },
                    });
                  }}
                />
                <SkeletonLabel />
                <Box border="divider" borderRadius="base" minHeight="2rem" />
                <SkeletonLabel maxWidth="8rem" />
                <Box border="divider" borderRadius="base" minHeight="20rem" />
              </DndContext> */}
            </AlphaStack>
          </AlphaCard>
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4">
              <SkeletonDisplayText size="small" />
              <Columns columns={{ xs: 1, md: 2 }}>
                <Box border="divider" borderRadius="base" minHeight="10rem" />
                <Box border="divider" borderRadius="base" minHeight="10rem" />
              </Columns>
            </AlphaStack>
          </AlphaCard>
        </AlphaStack>

        <AlphaStack gap={{ xs: "4", md: "2" }}>
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4">
              <SkeletonDisplayText size="small" />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <Box>
                <Bleed marginInline={{ xs: 4, sm: 5 }}>
                  <Divider borderStyle="divider" />
                </Bleed>
              </Box>
              <SkeletonLabel />
              <Divider borderStyle="divider" />
              <SkeletonBodyText />
            </AlphaStack>
          </AlphaCard>
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4">
              <SkeletonLabel />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel maxWidth="4rem" />
              <Box border="divider" borderRadius="base" minHeight="2rem" />
              <SkeletonLabel />
              <SkeletonBodyText />
            </AlphaStack>
          </AlphaCard>
        </AlphaStack>
      </Columns>
    </Page>
  );
}
