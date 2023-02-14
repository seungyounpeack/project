package kr.go.guri.manager.dataMng.dataReg.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.dataMng.dataReg.service.DataRegService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 관리자 > 데이터 등록 Service Implements 클래스
* @author 서미현
* @since 2022. 10. 10.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			        수정자			   수정내용
*  -------      -------------   ----------------------
*  2022.10.10.   	서미현                          최초 생성
*   
* </pre>
*/
@Service("dataRegService")
public class DataRegServiceImpl implements DataRegService{

	Logger LOGGER = LoggerFactory.getLogger(DataRegServiceImpl.class);

	@Resource(name = "dataRegMapper")
	private DataRegMapper dataRegMapper;

	@Override
	public List<Map<String, Object>> getDataList(Map<String, Object> param) throws Exception, SQLException {
		LOGGER.info("DataRegServiceImpl - getDataList 호출 ");
		return dataRegMapper.getDataList(param);
	}

	@Override
	public List<Map<String, Object>> getDataHisList(Map<String, Object> param) throws Exception, SQLException {
		LOGGER.info("DataRegServiceImpl - getDataHisList 호출");
		return dataRegMapper.getDataHisList(param);
	}
	
	@Override
	public List<Map<String, Object>> getDepList() throws Exception, SQLException {
		LOGGER.info("DataRegServiceImpl - getDepList 호출");
		return dataRegMapper.getDepList();
	}
	
	@Override
	public Map<String, Object> getDataTableNm(Map<String, Object> param) throws Exception, SQLException {
		LOGGER.info("DataRegServiceImpl - getDataTableNm 호출");
		return dataRegMapper.getDataTableNm(param);
	}

	@Override
	public Map<String, Object> getDataContentAllCount(Map<String, Object> param) throws Exception, SQLException {
		LOGGER.info("DataRegServiceImpl - getDataContentAllCount 호출");
		return dataRegMapper.getDataContentAllCount(param);
	}

	@Override
	public List<Map<String, Object>> getDataYearList(Map<String, Object> param) throws Exception, SQLException {
		LOGGER.info("DataRegServiceImpl - getDataYearList 호출");
		return dataRegMapper.getDataYearList(param);
	}

	@Override
	public List<Map<String, Object>> selectColCom(Map<String, Object> param) throws Exception, SQLException {
		LOGGER.info("DataRegServiceImp - selectColCom 호출");
		return dataRegMapper.selectColCom(param);
	}
	
	@Override
	public int insertFileUploadInfo(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImpl - insertFileUploadInfo 호출 ");
		return dataRegMapper.insertFileUploadInfo(param);
	}

	@Override
	public int insertFileUploadHistory(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImpl - insertFileUploadHistory 호출 ");
		return dataRegMapper.insertFileUploadHistory(param);
	}

	@Override
	public Map<String, Object> selectUpliadFileInfo(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImpl - selectUpliadFileInfo 호출 ");
		return dataRegMapper.selectUpliadFileInfo(param);
	}

	@Override
	public Map<String, Object> selectTableExist(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImpl - selectTableExist 호출 ");
		return dataRegMapper.selectTableExist(param);
	}

	@Override
	public int createIfTable(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImpl - createIfTable 호출 ");
		return dataRegMapper.createIfTable(param);
	}

	@Override
	public List<Map<String, Object>> selectGetColumn(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImp - selectGetColumn 호출 ");
		return dataRegMapper.selectGetColumn(param);
	}

	@Override
	public List<Map<String, Object>> selectGetColumnType(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImp - selectGetColumnType 호출");
		return dataRegMapper.selectGetColumnType(param);
	}

	@Override
	public int deleteIfTable(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImp - deleteIfTable 호출");
		return dataRegMapper.deleteIfTable(param);
	}

	@Override
	public int InsertDataTable(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImp - InsertDataTable 호출");
		return dataRegMapper.InsertDataTable(param);
	}

	@Override
	public Map<String, Object> selectDldFile(Map<String, Object> param) throws SQLException, IOException {
		LOGGER.info("DataRegServiceImp - selectDldFile 호출");
		return dataRegMapper.selectDldFile(param);
	}



}
