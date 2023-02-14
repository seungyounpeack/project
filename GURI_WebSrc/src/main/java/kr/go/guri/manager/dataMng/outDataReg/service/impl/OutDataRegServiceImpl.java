package kr.go.guri.manager.dataMng.outDataReg.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.dataMng.outDataReg.service.OutDataRegService;

@Service("outDataRegService")
public class OutDataRegServiceImpl implements OutDataRegService{

	@Resource(name = "outDataRegMapper")
	private OutDataRegMapper outDataRegMapper;

	@Override
	public List<Map<String, Object>> outDataList(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.outDataList(param);
	}

	@Override
	public List<Map<String, Object>> outDataHisList(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.outDataHisList(param);
	}
	
	@Override
	public Map<String, Object> selectUpliadFileInfo(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.selectUpliadFileInfo(param);
	}
	
	@Override
	public int insertFileUploadInfo(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.insertFileUploadInfo(param);
	}

	@Override
	public int insertFileUploadHistory(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.insertFileUploadHistory(param);
	}

	@Override
	public int createSvcInfl(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.createSvcInfl(param);
	}

	@Override
	public int insertSvcInfl(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.insertSvcInfl(param);
	}

	@Override
	public int deleteSvcInfl(Map<String, Object> param) throws SQLException , IOException {
		return outDataRegMapper.deleteSvcInfl(param);
	}

	

	
	
}
