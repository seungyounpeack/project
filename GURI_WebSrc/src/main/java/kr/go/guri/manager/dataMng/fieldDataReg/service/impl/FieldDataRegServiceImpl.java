package kr.go.guri.manager.dataMng.fieldDataReg.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.dataMng.fieldDataReg.service.FieldDataRegService;

@Service("fieldDataRegService")
public class FieldDataRegServiceImpl implements FieldDataRegService{

	@Resource(name = "fieldDataRegMapper")
	private FieldDataRegMapper fieldDataRegMapper;

	@Override
	public List<Map<String, Object>> fieldDataList(Map<String, Object> param) throws SQLException , IOException {
		return fieldDataRegMapper.fieldDataList(param);
	}

	@Override
	public List<Map<String, Object>> fieldDataCode() throws SQLException , IOException {
		return fieldDataRegMapper.fieldDataCode();
	}

	@Override
	public Map<String, Object> selectData(Map<String, Object> param) throws SQLException , IOException {
		return fieldDataRegMapper.selectData(param);
	}

	@Override
	public int fieldDataInsert(Map<String, Object> param) throws SQLException , IOException {
		return fieldDataRegMapper.fieldDataInsert(param);
	}

	@Override
	public int fieldDataUpdate(Map<String, Object> param) throws SQLException , IOException {
		return fieldDataRegMapper.fieldDataUpdate(param);
	}

	@Override
	public Map<String, Object> fieldFileData(Map<String, Object> param) throws SQLException , IOException {
		return fieldDataRegMapper.fieldFileData(param);
	}
	
	
	
}
