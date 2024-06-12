import mongoose from 'mongoose';
import { Page } from '../model/pageModel.js';
import { newPage, getPage, getPages, updatePage, deletePage, deleteUserPages } from '../controllers/page.js';

jest.mock('../model/pageModel.js');

describe('Page Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      user: { _id: 'userId' },
    };
    res = {
      json: jest.fn().mockReturnValue(res),
      status: jest.fn().mockReturnValue(res),
      send: jest.fn().mockReturnValue(res),
    };
  });

  describe('newPage', () => {
    it('should create a new page', async () => {
      Page.prototype.save = jest.fn().mockResolvedValue({ _id: 'pageId' });
      req.body = { title: 'Test Page' };

      await newPage(req, res);

      expect(Page).toHaveBeenCalledWith({ ...req.body, owner: req.user._id });
      expect(res.json).toHaveBeenCalledWith({
        message: 'Page created successfully',
        savedPage: { _id: 'pageId' },
      });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error creating page';
      Page.prototype.save = jest.fn().mockRejectedValue(new Error(errorMessage));

      await newPage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('getPage', () => {
    it('should get a page', async () => {
      Page.findOne = jest.fn().mockResolvedValue({ _id: 'pageId' });
      req.params.id = 'pageId';

      await getPage(req, res);

      expect(Page.findOne).toHaveBeenCalledWith({ _id: req.params.id, owner: req.user });
      expect(res.send).toHaveBeenCalledWith({ _id: 'pageId' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error getting page';
      Page.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));

      await getPage(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getPages', () => {
    it('should get pages', async () => {
      Page.find = jest.fn().mockResolvedValue([{ _id: 'pageId' }]);

      await getPages(req, res);

      expect(Page.find).toHaveBeenCalledWith({ owner: req.user._id });
      expect(res.send).toHaveBeenCalledWith([{ _id: 'pageId' }]);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error getting pages';
      Page.find = jest.fn().mockRejectedValue(new Error(errorMessage));

      await getPages(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updatePage', () => {
    it('should update a page', async () => {
      const updates = ['navBar'];
      req.body = { navBar: 'updatedNavBar' };
      req.params.id = 'pageId';
      const page = { save: jest.fn().mockResolvedValue(true) };
      Page.findOne = jest.fn().mockResolvedValue(page);

      await updatePage(req, res);

      expect(Page.findOne).toHaveBeenCalledWith({ _id: req.params.id, owner: req.user._id });
      expect(page.navBar).toBe('updatedNavBar');
      expect(page.save).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({ message: 'page has been updated successfully', page });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error updating page';
      Page.findOne = jest.fn().mockRejectedValue(new Error(errorMessage));

      await updatePage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('deletePage', () => {
    it('should delete a page', async () => {
      Page.findOneAndDelete = jest.fn().mockResolvedValue({ _id: 'pageId' });
      req.params.id = 'pageId';

      await deletePage(req, res);

      expect(Page.findOneAndDelete).toHaveBeenCalledWith({ _id: req.params.id, owner: req.user._id });
      expect(res.json).toHaveBeenCalledWith({ message: 'Page deleted successfully' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error deleting page';
      Page.findOneAndDelete = jest.fn().mockRejectedValue(new Error(errorMessage));

      await deletePage(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('deleteUserPages', () => {
    it('should delete user pages', async () => {
      Page.deleteMany = jest.fn().mockResolvedValue(true);

      await deleteUserPages(req.user._id, res);

      expect(Page.deleteMany).toHaveBeenCalledWith({ owner: req.user._id });
      expect(res.json).toHaveBeenCalledWith({ message: "User's pages deleted successfully" });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error deleting user pages';
      Page.deleteMany = jest.fn().mockRejectedValue(new Error(errorMessage));

      await deleteUserPages(req.user._id, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
