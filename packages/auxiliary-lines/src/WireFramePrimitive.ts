import { MathUtil, Vector3 } from "oasis-engine";

/**
 * Wireframe primitive.
 */
export class WireFramePrimitive {
  /** global settings for vertex count */
  static vertexCount = 40;

  /**
   * Store cuboid wireframe mesh data.
   * The origin located in center of cuboid.
   * @param width - Cuboid width
   * @param height - Cuboid height
   * @param depth - Cuboid depth
   * @param vertexBegin - The min of index list
   * @param positions - position array
   * @param indices - index array
   */
  static createCuboidWireFrame(
    width: number,
    height: number,
    depth: number,
    vertexBegin: number,
    positions: Vector3[],
    indices: number[]
  ) {
    const halfWidth: number = width / 2;
    const halfHeight: number = height / 2;
    const halfDepth: number = depth / 2;

    // Up
    positions.push(new Vector3(-halfWidth, halfHeight, -halfDepth));
    positions.push(new Vector3(halfWidth, halfHeight, -halfDepth));
    positions.push(new Vector3(halfWidth, halfHeight, halfDepth));
    positions.push(new Vector3(-halfWidth, halfHeight, halfDepth));

    // Down
    positions.push(new Vector3(-halfWidth, -halfHeight, -halfDepth));
    positions.push(new Vector3(halfWidth, -halfHeight, -halfDepth));
    positions.push(new Vector3(halfWidth, -halfHeight, halfDepth));
    positions.push(new Vector3(-halfWidth, -halfHeight, halfDepth));

    // Left
    positions.push(new Vector3(-halfWidth, halfHeight, -halfDepth));
    positions.push(new Vector3(-halfWidth, halfHeight, halfDepth));
    positions.push(new Vector3(-halfWidth, -halfHeight, halfDepth));
    positions.push(new Vector3(-halfWidth, -halfHeight, -halfDepth));

    // Right
    positions.push(new Vector3(halfWidth, halfHeight, -halfDepth));
    positions.push(new Vector3(halfWidth, halfHeight, halfDepth));
    positions.push(new Vector3(halfWidth, -halfHeight, halfDepth));
    positions.push(new Vector3(halfWidth, -halfHeight, -halfDepth));

    // Front
    positions.push(new Vector3(-halfWidth, halfHeight, halfDepth));
    positions.push(new Vector3(halfWidth, halfHeight, halfDepth));
    positions.push(new Vector3(halfWidth, -halfHeight, halfDepth));
    positions.push(new Vector3(-halfWidth, -halfHeight, halfDepth));

    // Back
    positions.push(new Vector3(-halfWidth, halfHeight, -halfDepth));
    positions.push(new Vector3(halfWidth, halfHeight, -halfDepth));
    positions.push(new Vector3(halfWidth, -halfHeight, -halfDepth));
    positions.push(new Vector3(-halfWidth, -halfHeight, -halfDepth));

    // Up
    indices.push(
      vertexBegin,
      1 + vertexBegin,
      1 + vertexBegin,
      2 + vertexBegin,
      2 + vertexBegin,
      3 + vertexBegin,
      3 + vertexBegin,
      vertexBegin
    );
    // Down
    indices.push(
      4 + vertexBegin,
      5 + vertexBegin,
      5 + vertexBegin,
      6 + vertexBegin,
      6 + vertexBegin,
      7 + vertexBegin,
      7 + vertexBegin,
      4 + vertexBegin
    );
    // Left
    indices.push(
      8 + vertexBegin,
      9 + vertexBegin,
      9 + vertexBegin,
      10 + vertexBegin,
      10 + vertexBegin,
      11 + vertexBegin,
      11 + vertexBegin,
      8 + vertexBegin
    );
    // Right
    indices.push(
      12 + vertexBegin,
      13 + vertexBegin,
      13 + vertexBegin,
      14 + vertexBegin,
      14 + vertexBegin,
      15 + vertexBegin,
      15 + vertexBegin,
      12 + vertexBegin
    );
    // Front
    indices.push(
      16 + vertexBegin,
      17 + vertexBegin,
      17 + vertexBegin,
      18 + vertexBegin,
      18 + vertexBegin,
      19 + vertexBegin,
      19 + vertexBegin,
      16 + vertexBegin
    );
    // Back
    indices.push(
      20 + vertexBegin,
      21 + vertexBegin,
      21 + vertexBegin,
      22 + vertexBegin,
      22 + vertexBegin,
      23 + vertexBegin,
      23 + vertexBegin,
      20 + vertexBegin
    );
  }

  /**
   * Store sphere wireframe mesh data.
   * The origin located in center of sphere.
   * @param radius - Sphere radius
   * @param vertexBegin - The min of index list
   * @param positions - position array
   * @param indices - index array
   */
  static createSphereWireFrame(radius: number, vertexBegin: number, positions: Vector3[], indices: number[]) {
    const vertexCount = WireFramePrimitive.vertexCount;
    const shift = new Vector3();

    // X
    WireFramePrimitive.createCircleWireFrame(radius, 0, shift, vertexBegin, vertexCount, positions, indices);

    // Y
    WireFramePrimitive.createCircleWireFrame(
      radius,
      1,
      shift,
      vertexBegin + vertexCount,
      vertexCount,
      positions,
      indices
    );

    // Z
    WireFramePrimitive.createCircleWireFrame(
      radius,
      2,
      shift,
      vertexBegin + vertexCount * 2,
      vertexCount,
      positions,
      indices
    );
  }

  /**
   * Store cone wireframe mesh data.
   * The origin located in top of cone.
   * @param radius - The radius of cap
   * @param height - The height of cone
   * @param vertexBegin - The min of index list
   * @param positions - position array
   * @param indices - index array
   */
  static createConeWireFrame(
    radius: number,
    height: number,
    vertexBegin: number,
    positions: Vector3[],
    indices: number[]
  ) {
    const vertexCount = WireFramePrimitive.vertexCount;
    const shift = new Vector3();

    // Y
    shift.y = -height;
    WireFramePrimitive.createCircleWireFrame(radius, 1, shift, vertexBegin, vertexCount, positions, indices);

    positions.push(new Vector3(0, height, 0));
    positions.push(new Vector3(-radius, -height, 0));
    positions.push(new Vector3(radius, -height, 0));
    positions.push(new Vector3(0, -height, radius));
    positions.push(new Vector3(0, -height, -radius));
    const indexBegin = vertexBegin + vertexCount;
    indices.push(
      indexBegin,
      indexBegin + 1,
      indexBegin,
      indexBegin + 2,
      indexBegin,
      indexBegin + 3,
      indexBegin,
      indexBegin + 4
    );
  }

  /**
   * Store unbound cylinder wireframe mesh data.
   * The origin located in center of sphere.
   * @param radius - The radius
   * @param vertexBegin - The min of index list
   * @param positions - position array
   * @param indices - index array
   */
  static createUnboundCylinderWireFrame(radius: number, vertexBegin: number, positions: Vector3[], indices: number[]) {
    const height = 5;
    const vertexCount = WireFramePrimitive.vertexCount;
    const shift = new Vector3();

    // Y
    WireFramePrimitive.createCircleWireFrame(radius, 1, shift, vertexBegin, vertexCount, positions, indices);

    const indexBegin = vertexBegin + vertexCount;
    for (let i = 0; i < 8; i++) {
      let radian = MathUtil.degreeToRadian(45 * i);
      positions.push(new Vector3(radius * Math.cos(radian), 0, radius * Math.sin(radian)));
      positions.push(new Vector3(radius * Math.cos(radian), -height, radius * Math.sin(radian)));

      indices.push(indexBegin + 2 * i, indexBegin + 2 * i + 1);
    }
  }

  /**
   * Store capsule wireframe mesh data.
   * The origin located in center of capsule.
   * @param radius - The radius of the two hemispherical ends
   * @param height - The height of the cylindrical part, measured between the centers of the hemispherical ends
   * @param vertexBegin - The min of index list
   * @param positions - position array
   * @param indices - index array
   */
  static createCapsuleWireFrame(
    radius: number,
    height: number,
    vertexBegin: number,
    positions: Vector3[],
    indices: number[]
  ) {
    const vertexCount = WireFramePrimitive.vertexCount;
    const shift = new Vector3();
    const halfHeight = height / 2;

    // Y-Top
    shift.y = halfHeight;
    WireFramePrimitive.createCircleWireFrame(radius, 1, shift, vertexBegin, vertexCount, positions, indices);

    // Y-Bottom
    shift.y = -halfHeight;
    WireFramePrimitive.createCircleWireFrame(
      radius,
      1,
      shift,
      vertexBegin + vertexCount,
      vertexCount,
      positions,
      indices
    );

    // X-Elliptic
    WireFramePrimitive.createEllipticWireFrame(
      radius,
      halfHeight,
      2,
      vertexBegin + vertexCount * 2,
      vertexCount,
      positions,
      indices
    );

    // Z-Elliptic
    WireFramePrimitive.createEllipticWireFrame(
      radius,
      halfHeight,
      0,
      vertexBegin + vertexCount * 3,
      vertexCount,
      positions,
      indices
    );
  }

  /**
   * Store circle wireframe mesh data.
   * @param radius - The radius
   * @param axis - The default direction
   * @param shift - The default shift
   * @param vertexBegin - The min of index list
   * @param vertexCount - count of new position
   * @param positions - position array
   * @param indices - index array
   */
  static createCircleWireFrame(
    radius: number,
    axis: number,
    shift: Vector3,
    vertexBegin: number,
    vertexCount: number,
    positions: Vector3[],
    indices: number[]
  ) {
    const twoPi = Math.PI * 2;
    const countReciprocal = 1.0 / vertexCount;
    for (let i = 0; i < vertexCount; ++i) {
      const v = i * countReciprocal;
      const thetaDelta = v * twoPi;

      switch (axis) {
        case 0:
          positions.push(
            new Vector3(shift.x, radius * Math.cos(thetaDelta) + shift.y, radius * Math.sin(thetaDelta) + shift.z)
          );
          break;
        case 1:
          positions.push(
            new Vector3(radius * Math.cos(thetaDelta) + shift.x, shift.y, radius * Math.sin(thetaDelta) + shift.z)
          );
          break;
        case 2:
          positions.push(
            new Vector3(radius * Math.cos(thetaDelta) + shift.x, radius * Math.sin(thetaDelta) + shift.y, shift.z)
          );
          break;
      }

      const globalIndex = i + vertexBegin;
      if (i < vertexCount - 1) {
        indices.push(globalIndex, globalIndex + 1);
      } else {
        indices.push(globalIndex, vertexBegin);
      }
    }
  }

  /**
   * Store elliptic wireframe mesh data.
   * @param radius - The radius of the two hemispherical ends
   * @param height - The height of the cylindrical part, measured between the centers of the hemispherical ends
   * @param axis - The default direction
   * @param vertexBegin - The min of index list
   * @param vertexCount - count of new position
   * @param positions - position array
   * @param indices - index array
   */
  static createEllipticWireFrame(
    radius: number,
    height: number,
    axis: number,
    vertexBegin: number,
    vertexCount: number,
    positions: Vector3[],
    indices: number[]
  ) {
    const twoPi = Math.PI * 2;
    const countReciprocal = 1.0 / vertexCount;
    for (let i = 0; i < vertexCount; ++i) {
      const v = i * countReciprocal;
      const thetaDelta = v * twoPi;

      switch (axis) {
        case 0:
          positions.push(new Vector3(0, radius * Math.sin(thetaDelta) + height, radius * Math.cos(thetaDelta)));
          break;
        case 1:
          positions.push(new Vector3(radius * Math.cos(thetaDelta), height, radius * Math.sin(thetaDelta)));
          break;
        case 2:
          positions.push(new Vector3(radius * Math.cos(thetaDelta), radius * Math.sin(thetaDelta) + height, 0));
          break;
      }

      if (i == vertexCount / 2) {
        height = -height;
      }

      const globalIndex = i + vertexBegin;
      if (i < vertexCount - 1) {
        indices.push(globalIndex, globalIndex + 1);
      } else {
        indices.push(globalIndex, vertexBegin);
      }
    }
  }
}
