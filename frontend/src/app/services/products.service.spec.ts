import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService} from '../services/products.service';
import {  Product } from '../services/products.service';

describe('ProductService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should create a product', fakeAsync(() => {
    const mockProductDetails: createProduct = {
      title: 'winter clothing',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1528597788073-3bf9d20118ef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'winter is coming!',
      stock: 20,
    };
    const mockToken = 'mockToken';

    let response: any;

    service.createProduct(mockProductDetails, mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('POST');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should get all products', fakeAsync(() => {
    const mockToken = 'mockToken';

    let response: any;

    service.getAllProducts(mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('GET');

    req.flush({
      status: 'success',
      products: [
        {
          product_id: '2229cd3a-211e-4c87-bbdf-eaba354f5bf2',
          title: 'New product',
          description:
            'new product',
          image:
            'https://images.unsplash.com/photo-1575719314727-64ce0e7a03d8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          price: 1800,
          stock: 5,
          isDeleted: false,
        },
        {
          product_id: '25c44f38-cf2e-4c8d-9b17-188d0e77f8f2',
          title: 'new product2',
          description:
            'this is the 2nd product2.',
          image:
            'https://images.unsplash.com/photo-1575719314727-64ce0e7a03d8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          price: 1800,
          stock: 5,
          isDeleted: false,
        },
      ],
    });

    tick();

    expect(response).toEqual({
      status: 'success',
      products: [
        {
          product_id: '2229cd3a-211e-4c87-bbdf-eaba354f5bf2',
          title: 'New',
          description:
            'this is the 2nd product2..',
          image:
            'https://images.unsplash.com/photo-1575719314727-64ce0e7a03d8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          price: 1800,
          stock: 5,
          isDeleted: false,
        },
        {
          product_id: '25c44f38-cf2e-4c8d-9b17-188d0e77f8f2',
          title: 'Old Monk Rum',
          description:
            'this is the 2nd product2',
          image:
            '',
          price: 1800,
          stock: 5,
          isDeleted: false,
        },
      ],
    });
  }));

  it('should get a product by ID', fakeAsync(() => {
    const mockProductId = 'mockProductId';
    const mockToken = 'mockToken';

    let response: any;

    service.getProductById(mockProductId, mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockProductId}`);
    expect(req.request.method).toBe('GET');

    req.flush({
      status: 'success',
      product: [
        {
          product_id: '25c44f38-cf2e-4c8d-9b17-188d0e77f8f2',
          title: 'Old Monk Rum',
          description:
            'this is the 2nd product2...',
          image:
            'https://images.unsplash.com/photo-1575719314727-64ce0e7a03d8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          price: 1800,
          stock: 5,
          isDeleted: false,
        },
      ],
    });

    tick();

    expect(response).toEqual({
      status: 'success',
      product: [
        {
          product_id: '25c44f38-cf2e-4c8d-9b17-188d0e77f8f2',
          title: 'Old Monk Rum',
          description:
            'this is the 2nd product2..',
          image:
            'https://images.unsplash.com/photo-1575719314727-64ce0e7a03d8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          price: 1800,
          stock: 5,
          isDeleted: false,
        },
      ],
    });
  }));

  it('should update a product', fakeAsync(() => {
    const mockProductDetails: Product = {
      product_id:
        'd779c7b6-ab6d-48d1-8d2b-f5287d7261f1ea-41d6-4e93-853a-05b191d96422',
      title: 'Taxido',
      price: 200,
      image:
        'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHN3ZWF0JTIwc2hpcnRzfGVufDB8fDB8fHww',

      description: 'good suits',
      stock: 100,
    };
    const mockToken = 'mockToken';

    let response: any;

    service.updateProduct(mockProductDetails, mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('PUT');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should delete a product by ID', fakeAsync(() => {
    const mockProductId = 'mockProductId';
    const mockToken = 'mockToken';

    let response: any;

    service.deleteProduct(mockProductId, mockToken).then((res) => {
      response = res;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockProductId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({ status: 'success' });

    tick();

    expect(response).toEqual({ status: 'success' });
  }));

  it('should handle errors during product creation', fakeAsync(() => {
    const mockProductDetails: createProduct = {
      title: 'winter clothing',
      price: 150,
      image:
        'https://images.unsplash.com/photo-1528597788073-3bf9d20118ef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'winter is coming!',
      stock: 20,
    };
    const mockToken = 'mockToken';

    let errorResponse: any;

    service.createProduct(mockProductDetails, mockToken).catch((error) => {
      errorResponse = error;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('POST');

    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    tick();

    expect(errorResponse).toBeDefined();
    expect(errorResponse.status).toBe(500);
  }));

  it('should handle errors during product retrieval', fakeAsync(() => {
    const mockToken = 'mockToken';

    let errorResponse: any;

    service.getAllProducts(mockToken).catch((error) => {
      errorResponse = error;
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/`);
    expect(req.request.method).toBe('GET');

    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    tick();

    expect(errorResponse).toBeDefined();
    expect(errorResponse.status).toBe(500);
  }));
});
